import mongoose, { model, Schema } from "mongoose";

const jobSchema = new Schema({
    jobTitle: {
        type:String,
        required:true
    },
    jobLocation: {
        type: String,
        enum: ["onsite", "remotely", "hybrid "],
        required:true
    },
    workingTime: {
        type: String,
        enum: ["full-time", "part-time"],
        required:true
    },
    seniorityLevel: {
        type: String,
        enum: ["Junior", "Mid-Level", "Senior", "Team-Lead", "CTO "],
        required:true
    },
    jobDescription: {
        type:String,
        required:true
    },
    technicalSkills: [String],
    softSkills: [String],
    addedBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    company: {
        type: mongoose.Types.ObjectId,
        ref: "Company",
        required:true
    },
},{
    versionKey: false,
});

export const Job = model("Job", jobSchema);
