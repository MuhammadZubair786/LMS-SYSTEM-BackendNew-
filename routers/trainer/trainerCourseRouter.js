import express from 'express';
import { AddCourse, DeleteCourse, EditCourse, getCourseById, getMyOfferedCourses } from '../../controller/trainer/coursesController.js';
import { AuthMiddleware } from '../../middleware/authMiddleware.js';
// import { multerFileHandler } from '../../services/multer.js';
export const trainerCourseRouter = express.Router();

trainerCourseRouter.post("/add",AuthMiddleware,AddCourse);
trainerCourseRouter.delete("/delete",AuthMiddleware,DeleteCourse);
trainerCourseRouter.put("/edit/:id",AuthMiddleware,EditCourse);
trainerCourseRouter.get("/",AuthMiddleware,getMyOfferedCourses);
trainerCourseRouter.get("/:id",AuthMiddleware,getCourseById);



