import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
    subjectName: {
        type: String,   
        required: true
    },
    subjectCode: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    gradeLevel: {
        type: String,
        required: true
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: false
    },
})

const SubjectModel = mongoose.model("Subject", subjectSchema)
export default SubjectModel