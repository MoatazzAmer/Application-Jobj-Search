

export const globalError = (err,req,res,next)=>{
    const code = err.statusCode || 500;
    res.status(code).json({message:"Error".message,error:err.error , code , stack:err.stack})
}