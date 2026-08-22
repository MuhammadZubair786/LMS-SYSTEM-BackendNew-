import mongoose from "mongoose";

let schema = new mongoose.Schema({
   name:{
    type:String,
    required:true
   },
   description:{
    type:String,
    required:true
   },
   amount:{
    type:Number,
    required:true
   },
   // modules:[
   //    {
   //       video:{
   //          type:String,
   //          required:true
   //       },
   //       module_name:{
   //           type:String,
   //           reauired:true
   //       }
   //    }
   // ],
   trainerId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
    required:true
   },
   approved:{
    type:Boolean,
    default:false
   },
   isDeleted:{
    type:Boolean,
    default:false
   }
})

export const courseModel = mongoose.model('courses',schema)