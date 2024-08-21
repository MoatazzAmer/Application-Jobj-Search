import { Router } from "express";
import { protectedRoutes, referTo } from "../authentication/auth.controller.js";
import { deleteAccount, forgetPassword, getUserDate, getUsers, updateAccount } from "./user.controller.js";



const userRouter = Router();

userRouter.put('/update',protectedRoutes , referTo('user'),updateAccount)
userRouter.delete('/delete',protectedRoutes , referTo('user'),deleteAccount)
userRouter.get('/getuserdata',protectedRoutes , referTo('user'),getUserDate)
userRouter.get('/:id',protectedRoutes , referTo('user'),getUserDate)
userRouter.post('/forgetpassword',forgetPassword)
userRouter.get('/',getUsers)

export default userRouter