import express from 'express'
import { adminAuthRouter } from './adminAuthRouter.js'
export const adminRouter = express.Router()

adminRouter.use('/auth',adminAuthRouter)

