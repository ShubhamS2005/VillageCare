import {catchAsyncErrors} from "../middleware/CatchAssyncErrors.js"
import { User } from "../models/user_scheema.js";
import ErrorHandler from "./errormiddleware.js";
import jwt from "jsonwebtoken"
export const isAdminAuthenticated=catchAsyncErrors(async(req,res,next)=>{
     const token=req.cookies.adminToken;
     if(!token){
        return next(new ErrorHandler("Admin not authenticated",400))

     }
     const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
     req.user=await User.findById(decoded.id);
    //  Autherization
     if(req.user.role!=="Admin"){
        return next(new ErrorHandler(`${req.user.role} not autherized for this resourse`,403))
     }
     next()

})

export const isLocalAdminAuthenticated=catchAsyncErrors(async(req,res,next)=>{
    const token=req.cookies.localAdminToken;
    if(!token){
       return next(new ErrorHandler("Local Admin not authenticated",400))

    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
    req.user=await User.findById(decoded.id);
   //  Autherization
    if(req.user.role!=="Guide"){
       return next(new ErrorHandler(`${req.user.role} not autherized for this resourse`,403))
    }
    next()

})

export const isServiceAuthenticated=catchAsyncErrors(async(req,res,next)=>{
   const token=req.cookies.serviceToken;
   if(!token){
      return next(new ErrorHandler("Service Provider not authenticated",400))

   }
   const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
   req.user=await User.findById(decoded.id);
  //  Autherization
   if(req.user.role!=="ServiceProvider"){
      return next(new ErrorHandler(`${req.user.role} not autherized for this resourse`,403))
   }
   next()

})

export const isRuralAuthenticated=catchAsyncErrors(async(req,res,next)=>{
   const token=req.cookies.ruralToken;
   if(!token){
      return next(new ErrorHandler("User not authenticated",400))

   }
   const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
   req.user=await User.findById(decoded.id);
  //  Autherization
   if(req.user.role!=="Rural"){
      return next(new ErrorHandler(`${req.user.role} not autherized for this resourse`,403))
   }
   next()

})