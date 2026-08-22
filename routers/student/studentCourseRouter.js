import express from 'express';
import { AuthMiddleware } from '../../middleware/authMiddleware.js';
import { getAllCourses,getCourseById, getMyCourses } from '../../controller/student/courseController.js';
export const studentCourseRouter = express.Router();


studentCourseRouter.get('/',AuthMiddleware,getAllCourses);
studentCourseRouter.get('/myCourses',AuthMiddleware,getMyCourses)
studentCourseRouter.get('/:id',AuthMiddleware,getCourseById);
