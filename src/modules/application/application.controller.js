import { Application } from "../../../database/models/application.model.js";
import { Job } from "../../../database/models/job.model.js";
import { AppError } from "../../middleWare/AppError.js";
import { catchError } from "../../middleWare/catchError.js";
import { ApiFeatures } from "../../utils/apiFeature.js";



// Apply Application to Job
// This function allows the user to apply for a specific job.
const applyToJobs = catchError(async(req,res,next)=>{

    // Save the uploaded resume file name in the request body
    req.body.userResume = req.file.filename;

    // Create a new document in the Application collection with the user's ID and other data
    const applyJob = new Application({
        user : req.user._id, // The ID of the user applying for the job
        ...req.body
    });

    // Save the application to the database
    await applyJob.save();
    res.status(201).json({message:"Success Apply Job",applyJob})
});

// Get all applications
// This function retrieves all applications for jobs added by the currently logged-in user (company HR).

const getAllApplications = catchError(async (req, res, next) => {

    // Find the job where the currently logged-in user is the one who added it (HR)
    const job = await Job.findOne({addedBy : req.user._id})
    
    if(job){

        // Apply API features such as pagination, filtering, sorting, and searching to the applications query
        let apifeature = new ApiFeatures(Application.find(),req.query)
            .pagination()
            .fields()
            .filter()
            .sort()
            .search();

            // Execute the query and populate user and job details
            let applications = await apifeature.mongooseQuery
            .populate("user", "userName")
            .populate("job", "jobTitle");

            // Get the total number of applications
        let totalApplication = await Application.countDocuments() 
            res
            .status(200)
            .json({ message: "success",totalApplication ,page: apifeature.pageNumber, applications });
    }
});

// Delete an application
// This function allows the HR to delete a specific application.
const deleteApplication = catchError(async (req, res, next) => {

    // Find the job where the currently logged-in user is the one who added it (HR)
    const job = await Job.findOne({addedBy : req.user._id})
    
    if(job){
        // Delete the application with the specified ID
        const application = await Application.findByIdAndDelete({_id : req.params.id});
        res.status(201).json({message:"Success Deleted Application",application})
    }
    
});


export{
    applyToJobs,getAllApplications,deleteApplication
}