import express from "express";
import * as authController from  '../controllers/auth.controller.js';
const authRouter  = express.Router();

authRouter.get('/',authController.auth);

export default authRouter;