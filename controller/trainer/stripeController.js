import Stripe from 'stripe';
import { userModel } from "../../models/user.js"
import jwt from 'jsonwebtoken';
let stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createConnectAccount = async(req,res,next)=>{
try{
const email = req.body.email;
const account = await stripe.accounts.create({
    type:"express",email
})
req.body.stripeAccountId = account.id //save in req.body
console.log("connect account created successfully!")
next();
}catch(err){
    return res.json({
    message:"stripe connect account creation failed",
    err:err.message
})
}
}

export const trainerOnBoarding = async(req,res) => {
try{
let token = req.headers.authorization?.split(" ")[1];
let {userId:trainerId} = jwt.verify(token,process.env.JWT_SECRET);
if(!trainerId){
    return
}
let {stripeAccountId} = 
await userModel.findById(trainerId)
.select('stripeAccountId');
let {details_submitted} = await stripe.accounts.retrieve(stripeAccountId)
if(details_submitted){
    return res.json({
        message:"trainer is already onboarded"
    })
}

const {url:onBoardingUrl} = await stripe.accountLinks.create({
    account:stripeAccountId,
    refresh_url: 'https://yourwebsite.com',
    return_url: `http://localhost:5001/api/trainer/stripe/onboarding-success/${trainerId}`,
    type: 'account_onboarding',
})

return res.json({
message:"trainer link ready for onboarding !!!",
onBoarding_url:onBoardingUrl,
})

}catch(err){
return res.json({
message:"failed in generating onboarding link!",
error:err.message
})
}
}

export const updateStripeStatus = async (req,res) => {
try{
    let {id:trainerId} = req.params;
    if(!trainerId){
        return res.json({
            message:"trainer id not found"
        })
    }
    let trainer = await userModel.findOne({_id:trainerId});
    let {stripeAccountId} = trainer
    let {details_submitted} = await stripe.accounts.retrieve(stripeAccountId);
    if(!details_submitted){
        return res.json({
            message:"trainer has not onboarded, onboard trainer to update status"
        })
    } 
    else if(trainer.stripeOnBoardedStatus){
          return res.json({
            message:"trainer status is already updated"
        })
    }
    trainer.stripeOnBoardedStatus = true;
    await trainer.save();
    res.json({
        message:"trainer status updated"
    })

}
catch(err){
    return res.json({
        message:"error in updating status",
        err:err.message
    })
}
}



