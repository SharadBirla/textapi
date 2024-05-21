import express from "express";
import * as authController from  '../controllers/authController';
const authRouter  = express.Router();

authRouter.get('/',authController.auth);
authRouter.post('/registerUser',authController.registerUser);
authRouter.post('/loginUser',authController.loginUser);
authRouter.post('/forgetPassword',authController.forgetPassword);



export default authRouter;  