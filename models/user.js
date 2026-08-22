import mongoose from "mongoose";

let schema = new mongoose.Schema({
    fullname:{
    type:String,
    required:true
    },
    username:{
    type:String,
    required:true,
    unique:true
    },
    email:{
    type:String,
    required:true,
    unique:true
    },
    password:{
    type:String,
    required:true
    },
    image:{
    type:String,
    required:true
    },
    role:{
    type:String,
    enum:['student','admin','trainer'],
    required:true
    },
    otp:{
    type:Number,
    required:true
    },
    verified:{
    type:Boolean,
    default:false
    },
    //for trainers only, useless for student and admin
    stripeOnBoardedStatus:{
        type:Boolean,
        default:false
    },
    stripeAccountId:String
})

export const userModel =  mongoose.model('user',schema)