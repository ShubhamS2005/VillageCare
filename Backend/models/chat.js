import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
  user: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

export const Chat=mongoose.model("Chat",userScheema)
