import { Router } from "express";
import { protectedRoutes, referTo } from "../authentication/auth.controller.js";
import { addJob, deleteJojs, getAllJobs, specificJobWithCompany, updateJobs } from "./job.controller.js";



const jobRouter = Router();

jobRouter.post('/addjob',protectedRoutes,referTo('company_HR'),addJob)
jobRouter.put('/:id',protectedRoutes,referTo('company_HR'),updateJobs)
jobRouter.delete('/:id',protectedRoutes,referTo('company_HR'),deleteJojs)
jobRouter.get('/:id',protectedRoutes,referTo('company_HR'),specificJobWithCompany)
jobRouter.get('/',getAllJobs)


export default jobRouter