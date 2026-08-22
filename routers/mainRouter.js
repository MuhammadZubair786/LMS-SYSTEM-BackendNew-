import express from 'express';
import { studentRouter } from './student/studentRouter.js';
import { adminRouter } from './admin/adminRouter.js';
import { trainerRouter } from './trainer/trainerRouter.js';
export const mainRouter = express.Router();

mainRouter.use("/student",studentRouter)
mainRouter.use("/trainer",trainerRouter)
mainRouter.use("/admin",adminRouter)