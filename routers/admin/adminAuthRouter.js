import express from 'express';
import { Login } from '../../controller/admin/authController.js';
export const adminAuthRouter = express.Router();

adminAuthRouter.post("/login",Login)


