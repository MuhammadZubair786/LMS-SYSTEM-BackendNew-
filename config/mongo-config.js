import mongoose from "mongoose";
import { userModel } from "../models/user.js";
export const connectMongo = async () => {
mongoose.connect(process.env.connectionString)
userModel.syncIndexes();
let connection = mongoose.connection
connection.once("open",()=> {
    console.log('mongo connected')
})
connection.on("error",()=> {
    console.log('mongo connection failed error occurred!')
})
}
