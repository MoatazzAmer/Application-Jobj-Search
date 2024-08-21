import { AppError } from "./AppError.js";


export const validate =(schema)=>{
    return(req,res,next)=>{
        const {error} = schema.validate({...req.body , ...req.params,...req.query},{abortEarly :true});
        if(!error){
            next()
        }else{
            let errMsg = error.details.map(err => err.message)
            next(new AppError(errMsg ,401))
        }
    }
}