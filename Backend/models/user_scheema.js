import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userScheema=new mongoose.Schema({
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
    phone:{
        type:String,
        required:true,
        minlength:[10,"phone number must contain Ten digits "],
        maxlength:[10,"phone number must contain Ten digits "]
    },
    password:{
        type:String,
        required:true,
        minlength:[4,"Password must contain at least 4 charaters"],
        select:false,
    },
    role:{
        type:String,
        requied:true,
        enum:["Rural","ServiceProvider","LocalAdmin","Admin"]
    },
    isVerified:{
        type:Number,
        default:0
    },
    userAvatar:{
        public_id:{
            type:String,
        },
        url:{
            type:String,
        },
    },
    doctorDepartment:{
        type:String,
    },
    SP_Role:{
        type:String,
    },
    

    
})


// any time user is registered password is saved in hash form
userScheema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password=await bcrypt.hash(this.password,10)
})

userScheema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}


// jwt key created =>> node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
userScheema.methods.generateJsonWebToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRES,
    });
}

export const User=mongoose.model("User",userScheema)