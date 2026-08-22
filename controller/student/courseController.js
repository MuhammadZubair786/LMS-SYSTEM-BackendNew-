import { courseModel } from "../../models/course.js"
import { purchasedCourseModel } from "../../models/purchasedCourse.js"

export const getAllCourses = async (req,res) => {
try{
if(!req.user || req.user.role !== 'student'){
    return res.json({
        message:"failed in authentication"
    })
}

// let courses = await courseModel.find({approved:true,isDeleted:false}).populate("trainerid").select("")

let courses = await courseModel.aggregate(
  [
  {
    '$match': {
      'approved': true, 
      'isDeleted': false
    }
  }, {
    '$lookup': {
      'from': 'users', 
      'localField': 'trainerId', 
      'foreignField': '_id', 
      'as': 'trainer'
    }
  }, {
    '$unwind': {
      'path': '$trainer'
    }
  }, {
    '$project': {
      'name': 1, 
      'description': 1, 
      'amount': 1, 
      'trainer': {
        'fullname': 1, 
        'email': 1, 
        'role': 1, 
        'stripeOnBoardedStatus': 1
      }
    }
  }
]
)

// 1000$: approved true 
if(!courses){
    return res.json({
        message:"no courses to return"
    })
}
 return res.json({
        message:"all approved courses returned!",
        data:courses
    })

}catch(err){
 return res.json({
        message:"error in returning courses!"
    })
}
}

export const getCourseById = async (req,res) => {
try{
if(!req.user || req.user.role !== 'student'){
    return res.json({
        message:"student is not logged in, failed in auth"
    })
}
let {id:courseId} = req.params
let course = await courseModel.findOne({_id:courseId,isDeleted:false,approved:true});
if(!course){
return res.json({
    message:"course not found"
})
}
//for checking whether student has purchased course or not 
let purchasedCourse = await purchasedCourseModel.findOne({
    courseId,studentId:req.user._id,access:true
    ,paymentStatus:"paid"
})
if(purchasedCourse){
return res.json({
    message:"course returned",
    data:{
        ...course,
        purchased:true
    }
})
}
res.json({
    message:"course returned",
    data:{
        ...course,
        purchased:false
    }
})
}catch(err){
    return res.json({
        message:"error in getting the course",
        error:err.message
    })
}
}

export const getMyCourses = async (req,res) => {
try{
if(!req.user || req.user.role !== 'student'){
    return res.json({
        message:"student is not logged in, failed in auth"
    })
}
let myCourses = await purchasedCourseModel.find({
    studentId:req.user._id.toString(),
    paymentStatus:"paid",
    access:true,
})
if(!myCourses || myCourses.length === 0){
    res.json({
        message:"This student has not purchased any course.."
    })
}

let courseIds = myCourses.map((course)=>course.courseId)
let courses = await courseModel.find({
    _id:{$in:courseIds}
})

res.json({
    message:"courses returned...!!!",
    data:courses
})
}catch(err){
    res.json({
        message:"failed to get courses",
        error:err.message
    })
}
}

