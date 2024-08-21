import Joi from "joi";




export const signUpVal = Joi.object({
    firstName:Joi.string().required(),
    lastName:Joi.string().required(),
    userName:Joi.string(),
    email:Joi.string().email().required(),
    password : Joi.string().pattern(/^[A-Z][a-z0-9A-Z]{8,40}$/).required(),
    mobileNumber:Joi.number().required(),
    BOD : Joi.date().iso().required(),
    role:Joi.string()
});

export const signInVal = Joi.object({
    email : Joi.string().email().required(),
    password : Joi.string().pattern(/^[A-Z][a-z0-9A-Z]{8,40}$/).required(),
});

export const changePasswordval = Joi.object({
    oldPassword : Joi.string().pattern(/^[A-Z][a-z0-9A-Z]{8,40}$/).required(),
    newPassword : Joi.string().pattern(/^[A-Z][a-z0-9A-Z]{8,40}$/).required(),

})