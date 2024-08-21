import mongoose from "mongoose";



export const dbConn = mongoose.connect("mongodb://localhost:27017/job_search_app")
        .then(()=>{
            console.log("Database Connected Successfuly ..");
            
        }).catch(()=>{
            console.log("Database Failed To Connect");
            
        })