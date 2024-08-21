import bcrypt from 'bcrypt'
import { model, Schema } from "mongoose";

const schema = new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type: String,
        enum: ["user", "company_HR"],
        required:true
    },
    status: {
        type: String,
        default: "offline",
        enum: ["online", "offline"],
    },
    passwordChangedAt :Date,
    mobileNumber: Number,
    BOD:Date
},{
    timestamps:true, versionKey:false
});

schema.pre('save',function(){
    this.password = bcrypt.hashSync(this.password , 10)
})

schema.pre('findOneAndUpdate',function(){
    if(this._update.password) this._update.password = bcrypt.hashSync(this._update.password , 10)
})
export const User = model('User',schema)