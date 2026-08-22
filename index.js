import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectMongo } from './config/mongo-config.js'
import { mainRouter } from './routers/mainRouter.js'

const app = express()
let port = process.env.port || 5000

connectMongo()

app.use(cors()); //for security reason
app.use(express.json());
app.use("/api",mainRouter);
app.use(express.static('uploads/images'));

app.listen(port,()=>{
    console.log('backend is running in port '+port)
})

