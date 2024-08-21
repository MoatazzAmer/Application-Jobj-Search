import { appRouter } from "./modules/application/application.routes.js";
import authRouter from "./modules/authentication/auth.routes.js"
import companyrouter from "./modules/company/company.routes.js";
import jobRouter from "./modules/job/job.routes.js";
import userRouter from "./modules/user/user.routes.js";




export const bootStrap = (app)=>{

    app.use('/api/auth',authRouter);
    app.use('/api/user',userRouter);
    app.use('/api/company',companyrouter);
    app.use('/api/job',jobRouter);
    app.use('/api/application',appRouter)
}