import mongoose from "mongoose";
const FAQSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true }
});

export const FAQ=mongoose.model("FAQ",FAQScheema)

