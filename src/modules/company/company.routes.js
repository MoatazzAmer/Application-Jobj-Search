import { Router } from "express";
import { protectedRoutes, referTo } from "../authentication/auth.controller.js";
import { checkEmailCompanyExists } from "../../middleWare/checkEmailExists.js";
import { addCompany, deleteCompany, getAllCompany, getSpcificCompany, updateCompany } from "./company.controller.js";
import { validate } from "../../middleWare/validation.js";
import { addCompanyVal } from "./company.validation.js";




const companyrouter = Router();

companyrouter.post('/addcompany',protectedRoutes , referTo('company_HR'),validate(addCompanyVal),checkEmailCompanyExists,addCompany)
companyrouter.put('/:id',protectedRoutes , referTo('company_HR'),checkEmailCompanyExists,updateCompany);
companyrouter.delete('/:id',protectedRoutes , referTo('company_HR'),deleteCompany);
companyrouter.get('/allcompany',getAllCompany)
companyrouter.get('/:id',getSpcificCompany)





export default companyrouter