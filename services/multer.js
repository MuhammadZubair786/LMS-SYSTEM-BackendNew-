import multer from "multer";
import path from "path";

let storage = multer.diskStorage({
    destination:'uploads/images/',
    filename:(req,file,cb)=>{
    let extension = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    let filename = file.fieldname + '-' + uniqueSuffix + extension 
    cb(null,filename)
    }
})

export const multerFileHandler = multer({storage})