import Joi from "joi";




export const addCompanyVal = Joi.object({
    companyName : Joi.string().min(2).max(30).required(),
    description : Joi.string().min(2).max(1000).required(),
    industry : Joi.string().min(2).max(100).required(),
    address : Joi.string().min(2).max(100).required(),
    numberOfEmployees : Joi.number().min(2).max(20).required(),
    companyEmail : Joi.string().required(),
    companyHR : Joi.string()
});

