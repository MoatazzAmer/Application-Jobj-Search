import {  Router } from "express";
import { protectedRoutes, referTo } from "../authentication/auth.controller.js";
import { uploadSingleFile } from "../../fileUpload/fileUpload.js";
import { applyToJobs, deleteApplication, getAllApplications } from "./application.controller.js";



const appRouter = Router();


appRouter.post('/applyjob',protectedRoutes,referTo('user'),
    uploadSingleFile('userResume','cv'),applyToJobs)

appRouter.get('/all-Application',getAllApplications)
appRouter.delete('/:id',protectedRoutes,referTo('company_HR'),deleteApplication)
export {appRouter}