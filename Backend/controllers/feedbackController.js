import { Feedback} from "../models/feedback_scheema.js"
import {catchAsyncErrors} from "../middleware/CatchAssyncErrors.js"
import ErrorHandler from "../middleware/errormiddleware.js"

export const sendMessage=catchAsyncErrors(async(req,res,next)=>{
    const{firstname,lastname,email,message}=req.body
    if(!firstname||!lastname||!email||!message){
        return next(new ErrorHandler("Please fill full form",400));
    }
    await Feedback.create({firstname,lastname,email,message})
    res.status(200).json({
        success:true,
        message:"FeedBack send succesfully"  
    })
})
export const GetAllMessages=catchAsyncErrors(async(req,res,next)=>{
   const messages=await Feedback.find()
   res.status(200).json({
    success:true,
    messages
   })
})

