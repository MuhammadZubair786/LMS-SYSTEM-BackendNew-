import express from 'express'
import { stripeRouter } from './stripeRouter.js'
import { studentAuthRouter } from './studentAuthRouter.js'
import { studentCourseRouter } from './studentCourseRouter.js'
export const studentRouter = express.Router()


studentRouter.use('/auth',studentAuthRouter)
studentRouter.use('/stripe',stripeRouter)
studentRouter.use('/courses',studentCourseRouter)


