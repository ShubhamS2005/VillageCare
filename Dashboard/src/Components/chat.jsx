import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chat = () => {
  const [message, setMessage] = useState(''); // Store current message
  const [chatHistory, setChatHistory] = useState([]); // Initialize as an empty array
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(0); // Track notifications

  // Load sound effects
  const openSound = new Audio('/close.mp3');
  const closeSound = new Audio('/open.mp3');

  // Function to toggle the chat window
  const toggleChat = () => {
    if (!isOpen) {
      openSound.play(); // Play open sound when opening
    } else {
      closeSound.play(); // Play close sound when closing
    }
    setIsOpen(!isOpen);
  };
  

  useEffect(() => {
    // Fetch chat history on load
    const fetchChatHistory = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/chat');
        
      } catch (error) {
        console.error('Error fetching chat history:', error);
        setChatHistory([]); // On error, default to empty array
      }
    };
    
    fetchChatHistory();
  }, []); // Dependency array empty, so this runs on component mount

  // Function to send a new message
  const sendMessage = async () => {
    if (message.trim() === '') return; // Don't send empty messages
    
    try {
      const res = await axios.post('http://localhost:5000/api/chat', { user: 'User', message });
      
      // Append new message and bot response to chat history
      setChatHistory([
        ...chatHistory, 
        { user: 'User', message }, // User message
        { user: 'Srishti', message: res.data.reply } // Bot reply from server
      ]);
      setMessage(''); // Clear input after sending

      if (!isOpen) {
        setNotifications(notifications + 1);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  

  // Auto-open the chatbot when the page reloads (only on the first load)
  useEffect(() => {
    setTimeout(() => {
      openSound.play(); // Play sound when chatbot automatically opens
      setIsOpen(true); // Automatically open the chat window after 1 second

      // Add personalized greeting message when chat opens
      const greeting = { user: 'Srishti', message: 'Hi there! How can I assist you today?' };
      setChatHistory([greeting]);

    }, 1000);
  }, []); // Run only once on component mount


  return (
    <div>
      {/* Chatbot Icon */}
      <div className="chatbot-icon" onClick={toggleChat}>
        💬
        {notifications > 0 && (
          <div className="notification-badge">{notifications}</div>
        )}
      </div>

      {/* Chat Window */}
      <div className={`chat-window ${isOpen ? 'open' : 'closed'}`}>
        {/* Header (Click to minimize) */}
        <div className="chat-window-header" onClick={toggleChat}>
          Srishti
        </div>

        {/* Chat History */}
        <div className="chat-history">
          {chatHistory.map((chat, index) => (
            <div key={index}>
              <strong>{chat.user}:</strong> {chat.message}
            </div>
          ))}
        </div>

        {/* Input Field */}
        <div className="chat-input">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
