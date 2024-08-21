import { User } from "../../../database/models/user.model.js";
import { AppError } from "../../middleWare/AppError.js";
import { catchError } from "../../middleWare/catchError.js";
import {  ApiFeatures } from "../../utils/apiFeature.js";



// Update user account
const updateAccount = catchError(async(req,res,next)=>{
    // Check if the new email or mobile number already exists in the database
    const email = await User.findOne({email:req.body.email});
    const mobile = await User.findOne({mobileNumber : req.body.mobileNumber})

    // If email or mobile number exists, return an error
    if(email)return next(new AppError('Sorry Email Aleardy Exists you can Choose another email',409))
    if(mobile)return next(new AppError('Sorry mobile Aleardy Exists you can Choose another Mobile Number',409))

    // Find the user by user ID and update their details
    const user = await User.findOneAndUpdate({user:req.user.userId} , {...req.body  }, {new :true});
    user || next(new AppError('User Not Found' ,401));
    !user || res.status(201).json({message :"Success Updated Account",user})
});

// Delete user account
const deleteAccount = catchError(async(req,res,next)=>{
        // Find the user by ID and delete their account
    const user = await User.findByIdAndDelete(req.user._id);
    user || next(new AppError('User Not Found' ,401));
    !user || res.status(201).json({message :"Success Delete Account",user})
});

// Get the logged-in user's data
const getUserDate =catchError(async(req,res,next)=>{
    // Find the user by ID
    const user = await User.findById(req.user._id);
    user || next(new AppError('User Not Found' ,401));
    !user || res.status(201).json({message :"Success Get Account Date",user})
});

// Get data for another user by their ID
const getDataForAnotherUser=catchError(async(req,res,next)=>{
    // Find the user by ID
    const user = await User.findById(req.params.id);
    user || next(new AppError('User Not Found' ,401));
    !user || res.status(201).json({message :"Success Get Account Date",user})
});

// Get all users with optional filters, sorting, and pagination
const getUsers = catchError(async (req, res, next) => {
    // Apply API features like pagination, filtering, sorting, and searching to the query
    let apiFeatures = new ApiFeatures(User.find(), req.query)
        .pagination()
        .fields()
        .filter()
        .sort()
        .search();
        // Execute the query and get the users
    let user = await apiFeatures.mongooseQuery;

    let totalUser = await User.countDocuments()
    res.status(200).json({ message: "success",totalUser, page: apiFeatures.pageNumber, user });
});

// Handle forget password functionality
const forgetPassword = catchError(async(req,res,next)=>{
    // Find the user by email and remove their password
    const user = await User.findOneAndUpdate({email:req.body.email},{ $unset: { password: 1 } } , {new:true})
    user || next(new AppError('User Not Found' ,401));

    // Set a new password for the user
    const forgetPassword = await User.findOneAndUpdate({email:req.body.email},{password : req.body.newPassword} , {new:true})
    !forgetPassword || res.status(201).json({message :"Success add new password",forgetPassword})


})
export {
    updateAccount,deleteAccount,getUserDate,getDataForAnotherUser,forgetPassword,getUsers
}