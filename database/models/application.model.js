import { model, Schema, Types } from "mongoose";





const schema = new Schema({
    job:{
        type:Types.ObjectId,
        ref:'Job'
    },
    user:{
        type:Types.ObjectId,
        ref:'User'
    },
    userResume:String
},{versionKey:false , timestamps:true});


schema.post('init',function(doc){
    if(doc.userResume) doc.userResume = process.env.BASE_URL +'cv/' + doc.userResume
})

export const Application = model('Application',schema)