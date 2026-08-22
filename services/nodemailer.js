import nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        pass:process.env.SMTP_APP_PASSWORD,
        user:process.env.SMTP_EMAIL,
    }
})

export const sendEmail = async(sender,reciever,html) => {
transporter.sendMail({
    from:sender,to:reciever,html
})
}