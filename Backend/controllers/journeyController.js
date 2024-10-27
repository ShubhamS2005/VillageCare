import {Journey} from "../models/journey_scheema.js"
import {catchAsyncErrors} from "../middleware/CatchAssyncErrors.js"
import ErrorHandler from "../middleware/errormiddleware.js"
import { User } from "../models/user_scheema.js"


export const postJourney=catchAsyncErrors(async(req,res,next)=>{
    const {
    firstname,
    lastname,
    email,
    phone,
    journeyDate,
    guide_firstname,
    guide_lastname,
    pickup,
    end,
    guide_email
    }=req.body
    if( !firstname||
        !lastname||
        !email||
        !phone||
        !guide_firstname||
        !guide_lastname||
        !pickup||
        !end||
        !journeyDate
        ){
            return next(new ErrorHandler("please Fill full form",400))
        }
    const isConflict=await User.find({
        firstname:guide_firstname,
        lastname:guide_lastname,
        role:"Guide",
    })
    if(isConflict.length===0){
        return next(new ErrorHandler("No Guide Found",400))
    }
    if(isConflict.length>1){
        return next(new ErrorHandler("More than one Guide with same credentials ! please contact through Email or Phone",400))
    }
    const GuideId=isConflict[0]._id
    const touristId=req.user._id
    const Journeys= await Journey.create({
        firstname,
        lastname,
        email,
        phone,
        journeyDate,
        Guide:{
            firstname:guide_firstname,
            lastname:guide_lastname,
        },
        GuideId,
        touristId,
        pickup,
        end
    })
    res.status(200).json({
        success:true,
        message:"Request sent successfully for Guide",
        Journeys
    })

})

export const getAllJourneys=catchAsyncErrors(async(req,res,next)=>{
    const Journeys=await Journey.find()
    res.status(200).json({
        success:true,
        Journeys,
    })
})

export const UpdateJourneysStatus=catchAsyncErrors(async(req,res,next)=>{
    const {id}=req.params
    let Journeys=await Journey.findById(id)
    if(!Journeys){
       return next(new ErrorHandler("Journey Details Not Found",404)) 
    }
    Journeys=await Journey.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })
    res.status(200).json({
        success:true,
        message:"Journey Status Updated",
        Journeys,
    })
})

export const DeleteJourney=catchAsyncErrors(async(req,res,next)=>{
    const {id}=req.params
    let Journeys=await Journey.findById(id)
    if(!Journeys){
       return next(new ErrorHandler("Journey Not Found",404)) 
    }
    await Journey.deleteOne()
    res.status(200).json({
        success:true,
        message:"Journey Deleted"
    })
})

export const GetUserJourney=catchAsyncErrors(async(req,res,next)=>{
    const {id}=req.params
    const Journeys=await Journey.find({userId:id})
    if(!Journeys){
       return next(new ErrorHandler("Journey Not Found",404)) 
    }
    res.status(200).json({
        success:true,
        Journeys,
    })
})