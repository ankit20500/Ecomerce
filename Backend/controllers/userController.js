const User=require("../models/UserModel");
const ErrorHandler = require("../utils/errorHandler")
const asyncErrorHandler=require("../utils/AsyncErrorHandler");
const sendTokens=require("../middleWares/sendTokens")
const sendEmail=require("../utils/sendEmail")
const crypto=require("crypto");
const fs=require("fs")
const uploadOnCloudinary=require("../utils/Cloudinary")


const register=asyncErrorHandler(async(req,res,next)=>{
    try {
        const {name,email,password}=req.body;
        const user=await User.create({
        name,
        email,
        password,
        avatar:{
        public_id:"this is sample id",
        url:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    }})
    sendTokens(user,200,res); 
    } catch (error) {
        res.status(200).json({
            message:error
        })
    }
    
})

// user login
const loginUser=asyncErrorHandler(async(req,res,next)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password)return next(new ErrorHandler("please enter email and password",400))
        const user=await User.findOne({email}).select("+password")
        if(!user)return next(new ErrorHandler("user not exist please register first",401))
        const isPasswordMatched = await user.comparePassword(password);
        if(!isPasswordMatched)return next(new ErrorHandler("wrong password",401))
        sendTokens(user,200,res);
    } catch (error) {
        res.status(200).json({
            message:error
        })
    }
})

// logout
const logout = asyncErrorHandler(async (req, res, next) => {
    const { token } = req.cookies;
    if (token==undefined) {
        return res.status(400).json({
            success: false,
            message: "You are already logged out",
        });
    }
    res.cookie("token", "", {
        expires: new Date(Date.now()), 
        httpOnly: true,
        secure:true
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});



// Forget passwork 
const forgetPassword=asyncErrorHandler(async(req,res,next)=>{
    const user=await User.findOne({email:req.body.email});
    if(!user){
        return next(new ErrorHandler("user not found",404))
    }
    // get Reset password token
    const resetToken= await user.getResetPasswordToken();
    await user.save({validateBeforeSave:false})
    const resetPasswordUrl=`http://localhost:4000/api/v1/password/reset/${resetToken}`
    const message=`your reset password token is:- \n\n ${resetPasswordUrl} \n\n if you have not requested this email then, please igore it`
    try{
        await sendEmail({
            email:user.email,
            subject:"ecommerce password recovery",
            message:message,
        })
        res.status(200).json({
            success:true,
            message:`Email send to ${user.email} successfully`
        })
    }catch(error){
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save({validateBeforeSave:false})
        return next(new ErrorHandler(error.message,500))
    }
})


// reset password
const resetPassword = asyncErrorHandler(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })
    if (!user) {
        return next(new ErrorHandler("Reset password token is invalid or has expired", 400))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Both passwords are different", 400));
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendTokens(user, 200, res);
})

// user full details
const userDetails=asyncErrorHandler(async(req,res,next)=>{
    const user=await User.findById(req.user.id);
    res.status(200).json({
        success:true,
        user,
    })
})

//update password by user
const updatePassword=asyncErrorHandler(async(req,res,next)=>{
    const {oldPassword,newPassword,confirmPassword}=req.body;
    const user=await User.findById(req.user.id).select("+password");    
    const isPasswordMatched=await user.comparePassword(oldPassword);
    if(!isPasswordMatched){
        return next(new ErrorHandler("old password is wrong",400))
    }
    if(newPassword !==confirmPassword){
        return next(new ErrorHandler("both the password are different",400))
    }

    user.password=req.body.newPassword;
    await user.save({validateBeforeSave:false});
    sendTokens(user,200,res);
})

// update user details
const updateProfile = asyncErrorHandler(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        number: req.body.number
    };

    let avatarImageLocalpath=req.file?.path;
    if(avatarImageLocalpath){
        const user = await User.findById(req.user.id);
        let existavatar = user.avatar ? user.avatar.public_id : null;

        const avatar = await uploadOnCloudinary(avatarImageLocalpath, req.user.id,existavatar);
        if (!avatar) {
            return next(new ErrorHandler("avatar is not uploaded successfully",500))
        }
        newUserData.avatar=avatar
    }
    
    const updatedUser = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user: updatedUser,
    });
});


// get all users details(admin ko check krna ho agr ke kitne log signup kiye hai)
const getAllUsers=asyncErrorHandler(async(req,res,next)=>{
    const users=await User.find();
    res.status(200).json({
        success:true,
        users,
    })
})

// get single user details by admin
const getSingleUser=asyncErrorHandler(async(req,res,next)=>{
    const user=await User.findById({_id:req.params.id});

    if(!user){
        return next(new ErrorHandler(`user not exist ${req.params.id}`,404))
    }
    res.status(200).json({
        success:true,
        user,
    })
})


// GET update the user role --->admin
const updateUserRole = asyncErrorHandler(async (req, res, next) => { 
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    };

    await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
    });
});


// remove user -->admin
const removeUser = asyncErrorHandler(async (req, res, next) => { 
    const user=await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler("user does not exist",400))
    }

    await user.deleteOne();

    res.status(200).json({
        success: true,
        message:"user deleted sucessfully"
    });
});


module.exports={register, loginUser,logout,forgetPassword,resetPassword,userDetails,updatePassword,updateProfile,getAllUsers,getSingleUser,updateUserRole,removeUser};