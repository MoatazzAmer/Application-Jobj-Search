import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'
import { AppError } from '../middleWare/AppError.js'

const fileUpload =(folderNAme)=>{
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
        cb(null, `uploads/${folderNAme}`)
        },
        filename: function (req, file, cb) {
        cb(null, uuidv4() + '-' + file.originalname)
        }
    })
    function fileFilter (req, file, cb) {

        if(file.mimetype.startsWith('application/pdf')){
            cb(null, true)
        }else{
            cb(new AppError('Please Upload Only PDF',409))
        }
    }
    const upload = multer({storage , fileFilter});
    return upload
};

export const uploadSingleFile =(filename,folderNAme)=>{
    return fileUpload(folderNAme).single(filename)
}