import express from "express";
import * as authController from  '../controllers/authController';
const authRouter  = express.Router();

authRouter.get('/',authController.auth);
authRouter.post('/registerUser',authController.registerUser);

export default authRouter;  