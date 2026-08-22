import express from 'express';
import Stripe from 'stripe'
import { handleSuccessCheckout, studentCourseCheckout } from '../../controller/student/stripeController.js';
import { AuthMiddleware } from '../../middleware/authMiddleware.js';
export const stripeRouter = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

stripeRouter.post('/course-checkout/:id',AuthMiddleware,studentCourseCheckout);
stripeRouter.get('/course-checkout/success/:id',handleSuccessCheckout);
