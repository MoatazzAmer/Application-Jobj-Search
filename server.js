import express from 'express';
import { dbConn } from './database/dbConnection.js';
import { globalError } from './src/utils/globalError.js';
import { AppError } from './src/middleWare/AppError.js';
import { bootStrap } from './src/bootStrap.js';
import 'dotenv/config'


const app = express();

app.use(express.json())
app.use("/uploads",express.static('uploads'))








bootStrap(app)
app.use('*',(req,res,next)=>{
    return next(new AppError(`Route Not Found ${req.originalUrl}` ,404))
})
app.use(globalError)
app.listen(3000,()=>{
    console.log("Server Running In Port 3000");
    
})