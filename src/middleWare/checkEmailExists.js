import { Company } from "../../database/models/company.model.js";
import { User } from "../../database/models/user.model.js";
import { AppError } from "./AppError.js";
import { catchError } from "./catchError.js";



export const checkEmailAndNumberExists=catchError(async(req,res,next)=>{



    const emailExists = await User.findOne({email:req.body.email});
    if(emailExists) return next(new AppError("Email Aleardy Exists",409))
    
    const mobile= await User.findOne({mobileNumber:req.body.mobileNumber});
    if(mobile) return next(new AppError('Number Aleardy Exists ..',409));
    next()

})

export const checkEmailCompanyExists = catchError(async(req,res,next)=>{

    const checkEmailCompany = await Company.findOne({companyEmail : req.body.companyEmail});
    if(checkEmailCompany) return next(new AppError('Company Email Aleardy Exists ...' ,409));
    next()
})


