import Stripe from 'stripe';
import { courseModel } from '../../models/course.js';
import { purchasedCourseModel } from '../../models/purchasedCourse.js';
import {userModel} from '../../models/user.js'
let stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const studentCourseCheckout = async(req,res)=>{
try{
    if(!req.user || req.user.role !== 'student'){
        return res.json({
            message:"user is not logged in , failed in auth"
        })
    }
  let {id:courseId} = req.params;
  let checkExisting = await purchasedCourseModel.findOne({
    studentId:req.user._id,
    courseId,
    access:true,
    paymentStatus:"paid"
  })
  if(checkExisting){
    return res.json({
        message:"this student has already purchased this course!"
    })
  }
  let {name,description,amount,trainerId} = await courseModel.findOne({_id:courseId});
  let unit_amount = amount * 100 //convert into cents
  const session = await stripe.checkout.sessions.create({
    mode:"payment", 
    customer_email:req.user.email,
    line_items:[
        {
            price_data:{
                currency:"usd",
                product_data:{
                    name,
                    description,
                    // images:['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTCHoFJtCAOnhqNnShwOzJ9ITkUtEZYjDI-Di1GjXVfg&s']
                },
                unit_amount, //100cent = 1$
            },
            quantity:1
        },
    ],
    metadata:{
    trainerId:trainerId.toString(),
    studentId:req.user._id.toString(),
    courseId:courseId.toString(),
    },
    success_url:"http://localhost:5001/api/student/stripe/course-checkout/success/{CHECKOUT_SESSION_ID}",//session id
    cancel_url:"http://localhost:5001/stripe/cancel"
  }) 

res.json({
    session
})

}catch(err){
 res.json({
    message:"payment failed,error occurred!",
    error:err.message
})
}
}

export const handleSuccessCheckout = async (req,res) => {
try{
let {id:sessionId} = req.params;
const session = await stripe.checkout.sessions.retrieve(sessionId);
if(!session){
    return res.json({
        message:"invalid session id"
    })
}
if(!session.status || !session.payment_status){
     return res.json({
        message:"session was not successful"
    })
}

const course = await courseModel.findOne({
    _id: session.metadata.courseId

})



let trainerAccount =  await userModel.findOne({
    _id:session.metadata.trainerId
})


const transerAmount = course.amount-(course.amount*0.2)
console.log( trainerAccount.stripeAccountId,course.amount,transerAmount)


const transfer = await stripe.transfers.create({
      amount: transerAmount, 
      currency: 'usd', 
      destination: trainerAccount.stripeAccountId,
      description: 'course payout', // Optional description
    });

    console.log('Transfer successful:', transfer.id);

// let {trainerId,studentId,courseId} = session.metadata;
let purchasedCourseInstance = new purchasedCourseModel({
    ...session.metadata,
    sessionId:session.id,
    amount:session.amount_total/100,
    access:true,
    paymentStatus:"paid"
})

purchasedCourseInstance.save()
res.json({
    message:"course purchased successfully!"
})

}catch(err){
    res.json({
        message:"failed in handling success checkout",
        error:err.message
    })
}
}