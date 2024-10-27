import {User} from "../models/user_scheema.js"
import {catchAsyncErrors} from "../middleware/CatchAssyncErrors.js"
import ErrorHandler from "../middleware/errormiddleware.js"
import {generateToken} from "../utils/jwtToken.js"
import cloudinary from "cloudinary"
import nodemailer from "nodemailer"



export const UserRegister=catchAsyncErrors(async(req,res,next)=>{
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("User Avatar Required!", 400));
      }
    const { userAvatar } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(userAvatar.mimetype)) {
        return next(new ErrorHandler("File Format Not Supported!", 400));
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(
        userAvatar.tempFilePath
      );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
          "Cloudinary Error:",
          cloudinaryResponse.error || "Unknown Cloudinary error"
        );
        return next(
          new ErrorHandler("Failed To Upload User Avatar To Cloudinary", 500)
        );
    }
    

    const{firstname,lastname,email,phone,password,role}=req.body
    if(!firstname||!lastname||!email||!phone||!password||!role){
        return next(new ErrorHandler("Please fill full form",400));
    }
    const user=await User.findOne({email})
    if(user){
        return next(new ErrorHandler("User Already registered",400));
    }
    else{
        const userData=await User.create({
            firstname,lastname,email,phone,password,role,
            userAvatar: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url,
              },
        })
        // generateToken(user,"user registered",200,res)
        sendVerifymail(firstname,lastname,email,userData._id)
        res.status(200).json({
            success:true,
            message:"User Registered,Verify your mail"
        })
    }
})

//Send Mail
export const sendVerifymail=async(firstname,lastname,email,user_id)=>{
    try {
        const transpoter=nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:465,
            requireTLS:true,
            auth:{
                user:process.env.EMAIL_USER,
                pass:process.env.PASSWORD_USER
            }
        });
        const mailoptions={
            from:process.env.EMAIL_USER,
            to:email,
            subject:'Verification of VillageCare',
            html:`<p>Hii ${firstname} ${lastname} ,this email is send to inform you that your account is created on VillageCare please verify your account by click here <a href="http://127.0.0.1:${process.env.PORT}/verify?id=${user_id}">Verify</a> </p>`
        }

        transpoter.sendMail(mailoptions,function(error,info){
            if(error){
                console.log(error);
            }
            else{
                console.log("Email has been sent:- ",info.response);
            }
        })
    } catch (error) {
        console.log(error.message);
    }
}

export const login=catchAsyncErrors(async(req,res,next)=>{
    const{email,password,role,confirmPassword}=req.body;
    if(!email||!password||!confirmPassword||!role){
        return next(new ErrorHandler("Please Provide all details",400));
    }
    if(password!==confirmPassword){
        return next(new ErrorHandler("Password and confirm password not same",400));
    }
    const user=await User.findOne({email}).select("+password")
    if(!user){
        return next(new ErrorHandler("Invalid Email or password",400));
    }
    const isPasswordMatched=await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or password",400));
    }
    
    if(role!==user.role){
        return next(new ErrorHandler("User with this role not found",400));
    }

    if(user.isVerified===0){
        return next(new ErrorHandler("User is not verifyied please click on link send to you"));
    }
    generateToken(user,"User Logged in Successfully",200,res)
})

export const AddNewAdmin=catchAsyncErrors(async(req,res,next)=>{
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("User Avatar Required!", 400));
      }
    const { userAvatar } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(userAvatar.mimetype)) {
        return next(new ErrorHandler("File Format Not Supported!", 400));
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(
        userAvatar.tempFilePath
      );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
          "Cloudinary Error:",
          cloudinaryResponse.error || "Unknown Cloudinary error"
        );
        return next(
          new ErrorHandler("Failed To Upload Admin Avatar To Cloudinary", 500)
        );
    }
    


    const{firstname,lastname,email,phone,password}=req.body
    if(!firstname||!lastname||!email||!phone||!password){
        return next(new ErrorHandler("Please fill full form",400));
    }
    const isRegistered=await User.findOne({email})
    if(isRegistered){
        return next(new ErrorHandler(`${isRegistered.role} with this email exists`,400));
    }
    await User.create(
        {firstname,lastname,email,phone,password,role:"Admin",isVerified:1,
        userAvatar:{
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
          }
        }
    )
    res.status(200).json({
        success:true,
        message:"New Admin is added"
    })

})

export const GetAllRural=catchAsyncErrors(async(req,res,next)=>{
    const rural=await User.find({role:"Rural"})
    res.status(200).json({
        success:true,
        rural
    })
})

export const GetService=catchAsyncErrors(async(req,res,next)=>{
    const {id}=req.params
    let service =await User.findById(id)
    res.status(200).json({
        success:true,
        service
    })
})

export const GetAllService=catchAsyncErrors(async(req,res,next)=>{
    const service=await User.find({role:"ServiceProvider"})
    res.status(200).json({
        success:true,
        service
    })
})

export const GetUser=catchAsyncErrors(async(req,res,next)=>{
    const user=req.user
    res.status(200).json({
        success:true,
        user
    })

})

export const AdminLogout=catchAsyncErrors(async(req,res,next)=>{
    res.status(200).cookie("adminToken","",{
        httpOnly:true,
        expires:new Date(Date.now()),
        
    }).json({
        success:true,
        message:"Admin Log out succesfully"
    })
})

export const LocalAdminLogout=catchAsyncErrors(async(req,res,next)=>{
    res.status(200).cookie("localAdminToken","",{
        httpOnly:true,
        expires:new Date(Date.now()),
        
    }).json({
        success:true,
        message:"Admin Log out succesfully"
    })
})

export const ServiceLogout=catchAsyncErrors(async(req,res,next)=>{
    res.status(200).cookie("serviceToken","",{
        httpOnly:true,
        expires:new Date(Date.now())
    }).json({
        success:true,
        message:"User Log out succesfully"
    })
})

export const ruralLogout=catchAsyncErrors(async(req,res,next)=>{
    res.status(200).cookie("ruralToken","",{
        httpOnly:true,
        expires:new Date(Date.now()),
        
    }).json({
        success:true,
        message:"User Log out succesfully"
    })
})

// export const UpdateUserElement=catchAsyncErrors(async(req,res,next)=>{
//     const {id}=req.params
//     const {SP_Role,doctorDepartment}=req.body
    
//     let user=await User.findByIdAndUpdate(id,
//         {
//         SP_Role:SP_Role,
//         doctorDepartment:doctorDepartment,
//         },{
//         new:true,
//         runValidators:true,
//         useFindAndModify:false,
//     })
//     res.status(200).json({
//         success:true,
//         message:"Status Updated",
//         user,
//     })
//   })

  export const UpdateElementId = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    console.log(req.body); // Check content of req.body

    let user = await User.findById(id);
    if (!user) {
        return next(new ErrorHandler("User Not Found", 404));
    }

    // Update user details
    user = await User.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        success: true,
        message: "User Details Updated",
        user,
    });
});

export const GetServicePerson=catchAsyncErrors(async(req,res,next)=>{
    const {id}=req.params
    const service=await User.findById(id)
    const ServiceData=await User.findOne({_id:service._id})
    
    if(!service){
        return next(new ErrorHandler("Service Not Found",404)) 
    }
    res.status(200).json({
        success:true,
        patient,
        ServiceData
    })
})

export const GetAllDoctors=catchAsyncErrors(async(req,res,next)=>{
    const doctors=await User.find({SP_Role:"Doctor"})
    res.status(200).json({
        success:true,
        doctors
    })

})