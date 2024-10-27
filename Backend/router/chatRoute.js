import express from "express"
import {Chat} from "../models/chat.js"
import {FAQ} from "../models/faq.js"

const router = express.Router();

// Get all chat history
router.get('/', async (req, res) => {
  try {
    const chatHistory = await Chat.find();
    res.json(chatHistory);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Post a new message
router.post('/', async (req, res) => {
  const { user, message } = req.body;

  try {
    const faq = await FAQ.findOne({ question: { $regex: message, $options: 'i' } });
    let replyMessage = faq ? faq.answer : 'Sorry, I didn\'t understand that.';
    
    const chat = new Chat({ user, message });
    await chat.save();
    
    res.json({ reply: replyMessage });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});


// Add a new FAQ (Admin only)
router.post('/add', async (req, res) => {
    const { question, answer } = req.body;
    
    try {
      const newFAQ = new FAQ({ question, answer });
      await newFAQ.save();
      res.json({ message: 'FAQ added successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Server Error: Could not add FAQ' });
    }
  });
  
  // Get all FAQs
  router.get('/all', async (req, res) => {
    try {
      const faqs = await FAQ.find();
      res.json(faqs);
    } catch (err) {
      res.status(500).json({ error: 'Server Error: Could not retrieve FAQs' });
    }
  });
  
  // Update an FAQ by ID (Admin only)
  router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { question, answer } = req.body;
    
    try {
      let faq = await FAQ.findById(id);
      if (!faq) {
        return res.status(404).json({ error: 'FAQ not found' });
      }
      faq.question = question || faq.question;
      faq.answer = answer || faq.answer;
      
      await faq.save();
      res.json({ message: 'FAQ updated successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Server Error: Could not update FAQ' });
    }
  });
  
  // Delete an FAQ by ID (Admin only)
  router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
      const faq = await FAQ.findById(id);
      if (!faq) {
        return res.status(404).json({ error: 'FAQ not found' });
      }
      await FAQ.deleteOne({ _id: id });
      res.json({ message: 'FAQ deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Server Error: Could not delete FAQ' });
    }
  });
  
module.exports = router;

