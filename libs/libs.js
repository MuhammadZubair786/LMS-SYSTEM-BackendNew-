import { sendEmail } from "../services/nodemailer.js"
import jwt from 'jsonwebtoken'

export const sendOtpEmail = async(sender,reciever,otp) =>{
     let emailTemplate = `
    <h1>Verify your signup at LMS by ${reciever}</h1>
    <h1>Your otp is ${otp}</h1>
    `
    await sendEmail(sender,reciever,emailTemplate)
}
export const sendResetPasswordEmail = async(sender,reciever,token) =>{
     let emailTemplate = `
     <h1>Click below to reset Password</h1>
   <button>
   <a href='http://localhost:3000/user/reset-password/${token}'>Reset password</a>
   </button>
    `
    await sendEmail(sender,reciever,emailTemplate)
}
export const generateOtp = () => {
    return Math.floor(Math.random()*100000)
}
export const generateToken = (expireTime,userId) => {
     let token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:expireTime})
     return token
}

