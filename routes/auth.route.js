import express from "express";
import { auth } from "../controllers/auth.controller";
import * as authController from  '../controllers/auth.controller';
export const router  = express.Router();

router.get('/',authController.auth);
