import mongoose from "mongoose"
import { courseModel } from "../../models/course.js"
import { userModel } from "../../models/user.js"

export const AddCourse = async(req,res) => {
try{
if(!req.user || req.user.role !== 'trainer'){
    return res.json({
        message:"trainer is not logged in, failed in auth"
    })
}
let {_id:trainerId} = req.user;
let {stripeOnBoardedStatus} = await userModel.findById(trainerId)
.select('stripeOnBoardedStatus')
if(!stripeOnBoardedStatus){
return res.json({
    message:"trainer is not onboarded, perform onboarding to add course"
})
}

let {name,description, amount} = req.body;
if(!name || !description || !amount){
    return res.json({
        message:"name,amount and description is required"
    })
}

req.body.trainerId = trainerId
await courseModel.create(req.body)

return res.json({
    message:"course added successfully!"
})

}catch(err){
    res.json({
        message:"error occurred in adding course",
        error:err.message
    })
}
}

export const DeleteCourse = async (req,res) => {
try{
if(!req.user || req.user.role !== 'trainer'){
    return res.json({
        message:"trainer is not logged in, failed in auth"
    })
}
let {courseId} = req.body;
let course = await courseModel.findById(courseId);
if(course.trainerId !== req.user._id){
    return res.json({
        message:"unauthorize, only you can delete your own course!"
    })
}

await courseModel.findByIdAndUpdate(courseId,{isDeleted:true})
res.json({
        message:"course deleted successfully!"
    })
}catch(err){
    res.json({
        message:"failed to delete course"
    })
}
}

export const EditCourse = async (req,res) => {
try{
    console.log("course")
if(!req.user || req.user.role !== 'trainer'){
    return res.json({
        message:"trainer is not logged in, failed in auth"
    })
}
let courseId = req.params.id;
if(!courseId || !mongoose.isValidObjectId(courseId)){
    console.log(courseId)
    return res.json({
        message:"course id not provided or invalid course id",
    })
}
let {name,description,amount} = req.body;
if(!name && !description && !amount){
return res.json({
        message:"nothing to update",
    })
} 

let course = await courseModel.findOne({_id:courseId},{isDeleted:false});
if(!course){
    return res.json({
        message:"course not found",
    })
}
course.name = name === undefined?course.name: name
course.amount = amount === undefined?course.amount: amount
course.description = description === undefined?course.description: description
await course.save()
return res.json({
    message:"course updated "
})
}catch(err){
    res.json({
        message:"error occured in editin course",
        error:err.message
    })
}
}

export const getMyOfferedCourses = async (req,res) => {
try{
if(!req.user || req.user.role !== 'trainer'){
    return res.json({
        message:"trainer is not logged in, failed in auth"
    })
}

let courses = await courseModel.find({trainerId:req.user._id});
if(!courses){
    return res.json({
        message:"courses not found",
    })
}
return res.json({
    message:"my courses fetched",
    data:courses
})
}catch(err){
    res.json({
        message:"error occured in getting courses",
        error:err.message
    })
}
}

export const getCourseById = async (req,res) => {
try{
if(!req.user || req.user.role !== 'trainer'){
    return res.json({
        message:"trainer is not logged in, failed in auth"
    })
}
let {id:courseId} = req.params
let course = await courseModel.findOne({_id:courseId,isDeleted:false});
if(!course){
return res.json({
    message:"course not found"
})
}
return res.json({
    message:"course returned",
    data:course
})
}catch(err){
    return res.json({
        message:"error in getting the course",
        error:err.message
    })
}
}

