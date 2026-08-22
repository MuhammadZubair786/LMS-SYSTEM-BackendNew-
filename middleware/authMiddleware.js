import jwt from 'jsonwebtoken';
import { userModel } from '../models/user.js';

export const AuthMiddleware = async (req,res,next) => {
try{
let token = req.headers.authorization?.split(" ")[1];
let {userId} = jwt.verify(token,process.env.JWT_SECRET)
if(!userId){
    return res.json({
        message:"token or id not found!"
    }) 
}

let user = await userModel.findById(userId).select('-password');
if(!user){
    return res.json({
        message:"invalid token, user not exist!"
    }) 
}
req.user = user;
next();

}catch(err){
    res.json({
        message:"authentication failed!",
        error:err.message
    })
}
}