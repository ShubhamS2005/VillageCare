import mongoose from "mongoose";
import validator from "validator";

const feedbackScheema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        minlength:[3,"first name must contain atleast three characters "]
    },
    lastname:{
        type:String,
        required:true,
        minlength:[3,"last name must contain atleast three characters "]
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"please provide a valid email"]
    },
    message:{
        type:String,
        required:true,
        minlength:[10,"message must contain atleast 10 chaacters "]
    },
})

export const Feedback=mongoose.model("Feedback",feedbackScheema)