import express from 'express';
import Stripe from 'stripe'
import { trainerOnBoarding, updateStripeStatus } from '../../controller/trainer/stripeController.js';
export const stripeRouter = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// for trainer connect account 
stripeRouter.post('/onboarding-success/:id',updateStripeStatus);
stripeRouter.post('/onboarding',trainerOnBoarding);
