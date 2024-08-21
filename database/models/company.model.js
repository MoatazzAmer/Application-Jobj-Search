import mongoose, { model, Schema, Types } from "mongoose";

const companySchema = new Schema({
    companyName: {
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    industry: {
        type:String,
        required:true
    },
    address: [String],
    numberOfEmployees: {
        type:Number,
        min:11,
        max:20
    },
    companyEmail: {
        type:String,
        required:true
    },
    companyHR: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
},{
    versionKey: false,timestamps:true
});

export const Company = model("Company", companySchema);
