import { Company } from "../../../database/models/company.model.js";
import { AppError } from "../../middleWare/AppError.js";
import { catchError } from "../../middleWare/catchError.js";
import {  ApiFeatures } from "../../utils/apiFeature.js";



// Add a new company
const addCompany = catchError(async(req,res,next)=>{

    // Create a new company with the companyHR set to the logged-in user's ID
    const company = new Company({
        companyHR : req.user._id,
        ...req.body
    });

    // Save the new company to the database
    await company.save();
    res.status(201).json({message:"Success Add Company",company})
});

// Update an existing company
const updateCompany = catchError(async(req,res,next)=>{

    // Find the company by its ID
    const company = await Company.findById(req.params.id);

    // If the company doesn't exist, return a 404 error
    if(!company) return next(new AppError('Company Not Found', 404));

    // Check if the logged-in user is the owner (companyHR) of the company
    if (company.companyHR.toString() !== req.user._id.toString()) {
        return next(new AppError('You are not the owner', 404));
    }

    // Update the company details with the new data
    const updateCompany = await Company.findByIdAndUpdate(req.params.id, req.body  , {new :true});
    updateCompany|| next(new AppError("Company Not Found",404))
    !updateCompany|| res.status(201).json({message :"Success Update Company",updateCompany})
})

// Delete a company
const deleteCompany = catchError(async(req,res,next)=>{
    // Find the company by its ID
    const company = await Company.findById(req.params.id);
    if(!company) return next(new AppError('Company Not Found', 404));

    // Check if the logged-in user is the owner (companyHR) of the company
    if (company.companyHR.toString() !== req.user._id.toString()) {
        return next(new AppError('You are not the owner', 404));
    }

    // Delete the company
    const deleteCompany = await Company.findByIdAndDelete(req.params.id);
    deleteCompany|| next(new AppError("Company Not Found",404))
    !deleteCompany|| res.status(201).json({message :"Success Deleted Company",deleteCompany})
})

// Get all companies with optional filters, sorting, and pagination
const getAllCompany = catchError(async(req,res,next)=>{

    // Apply API features such as pagination, filtering, sorting, and searching to the companies query
    let apiFeature = new ApiFeatures(Company.find(),req.query)
    .pagination()
    .fields()
    .filter()
    .sort()
    .search();
        // Execute the query and retrieve the companies
        const compaines = await apiFeature.mongooseQuery;
        // Get the total number of companies
        const allCompaines = await Company.countDocuments();
    res.status(201).json({message:"Get All Company",allCompaines , page:apiFeature.pageNumber , compaines})
})

// Get a specific company by ID
const getSpcificCompany = catchError(async(req,res,next)=>{
    // Find the company by its ID and populate the companyHR field with userName, email, and role
    const company = await Company.findById(req.params.id).populate("companyHR","userName , email role");
    res.status(201).json({company})
})

export{
    addCompany,updateCompany , deleteCompany,getAllCompany,getSpcificCompany
}