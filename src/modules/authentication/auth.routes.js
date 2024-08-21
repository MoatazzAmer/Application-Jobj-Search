import { Router } from "express";
import { changePassword, signIn, signUp } from "./auth.controller.js";
import { validate } from "../../middleWare/validation.js";
import { changePasswordval, signInVal, signUpVal } from "./auth.validation.js";
import { checkEmailAndNumberExists } from "../../middleWare/checkEmailExists.js";



const authRouter = Router();



authRouter.post('/signup',validate(signUpVal),checkEmailAndNumberExists,signUp);
authRouter.post('/signin',validate(signInVal),signIn)
authRouter.post('/changepassword',validate(changePasswordval),changePassword)

export default authRouter