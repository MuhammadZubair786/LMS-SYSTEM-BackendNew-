import express from 'express';
import { multerFileHandler } from '../../services/multer.js';
import { forgotPassword, Login, resetPassword, Signup, VerifyOtp } from '../../controller/trainer/authController.js';
import { createConnectAccount } from '../../controller/trainer/stripeController.js';
export const trainerAuthRouter = express.Router();

trainerAuthRouter.post("/signup",multerFileHandler.single('image'),createConnectAccount,Signup)
trainerAuthRouter.post("/verify-otp",VerifyOtp)
trainerAuthRouter.post("/login",Login)
trainerAuthRouter.post("/forgot-password",forgotPassword)
trainerAuthRouter.post("/reset-password",resetPassword)


