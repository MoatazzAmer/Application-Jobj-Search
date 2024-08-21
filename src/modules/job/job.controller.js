import { Company } from "../../../database/models/company.model.js";
import { Job } from "../../../database/models/job.model.js";
import { AppError } from "../../middleWare/AppError.js";
import { catchError } from "../../middleWare/catchError.js";
import {  ApiFeatures } from "../../utils/apiFeature.js";


// Add a new job
const addJob = catchError(async(req,res,next)=>{
    // Find the company by its ID
    const company = await Company.findById(req.body.company);

    // Check if the logged-in user is the owner (companyHR) of the company
    if (company.companyHR.toString() !== req.user._id.toString()) {
        return next(new AppError('You are not the owner', 404));
    }

    // Create a new job and associate it with the logged-in user
    const job = new Job({...req.body,addedBy:req.user._id});
    // Save the job to the database
    await job.save();
    res.status(201).json({message:"Success Add New Job",job})
});

// Update an existing job
const updateJobs = catchError(async(req,res,next)=>{
    // Find the company by its ID
    const company = await Company.findById(req.body.company);
    // Check if the logged-in user is the owner (companyHR) of the company
    if (company.companyHR.toString() !== req.user._id.toString()) {
        return next(new AppError('You are not the owner', 404));
    }
    // Update the job with the provided data
    const job = await Job.findByIdAndUpdate(req.params.id , req.body , {new:true})
    res.status(201).json({message:"Success Updated Job",job})
});

// Delete a job
const deleteJojs = catchError(async(req,res,next)=>{
    // Find the company by its ID
    const company = await Company.findById(req.body.company);
    // Check if the logged-in user is the owner (companyHR) of the company
    if (company.companyHR.toString() !== req.user._id.toString()) {
        return next(new AppError('You are not the owner', 404));
    }
    // Delete the job by its ID
    const job = await Job.findByIdAndDelete(req.params.id )
    res.status(201).json({message:"Success Deleted Job",job})
});

// Get specific job details for a company
const specificJobWithCompany = catchError(async(req,res,next)=>{
    // Find the company by its ID
    const company = await Company.findById(req.params.id);

    if (!company)return next(new AppError('Company Not Found', 404));
    // Check if the logged-in user is the owner (companyHR) of the company
    if (company.companyHR.toString() !== req.user._id.toString()) {
        return next(new AppError('You are not the owner', 404));
    }

    // Find jobs associated with the company and populate relevant fields
    const jobs = await Job.findOne({company:req.params.id})
    .populate('company','companyName industry') 
    .populate('addedBy', 'firstName lastName  email  role'); 

    res.status(200).json({ message: "Success", jobs });
});

// Get all jobs with optional filters, sorting, and pagination
const getAllJobs = catchError(async(req,res,next)=>{
    // Apply API features such as pagination, filtering, sorting, and searching to the jobs query
    let apiFeature = new ApiFeatures(Job.find(),req.query)
    .pagination()
    .fields()
    .filter()
    .sort()
    .search();
    // Execute the query and retrieve the jobs
    const jobs = await apiFeature.mongooseQuery;
    // Get the total number of jobs
    const allJobs = await Job.countDocuments();
    res.status(201).json({message:"Get All Company",allJobs , page:apiFeature.pageNumber , jobs})
})
export{
    addJob,updateJobs,deleteJojs,specificJobWithCompany,
    getAllJobs
}