import { userModel } from "../../models/user.js";

export const Login = async(req,res) => {
    try{
        let {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
            message:"bad request"
        })
        }

        let user = await userModel.findOne({email,password,role:"admin"})
        if(!user){
            return res.status(400).json({
            message:"invalid credentials, admin not found"
        })
        }

        return res.status(200).json({
            message:"admin login success!",
            data:{...user._doc}
        })

    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            message:"internal server error"
        })
    }
}