import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema({
    lastName: {
        type:String,
        required:true
    },

    firstName: {
        type:String,
        required:true
    },

    middleInitial: {
        type:String,
        required:true
    },

    dateOfBirth: {
        type:Date,
        required:true
    },

    gender: {
        type: 'male' || 'female',
        required:true
    },

    contactNumber: {
        type:String,
        required:true
    },

    address: {
        type:String,
        required:false
    }

},{
    timestamps:true
})

const StudentModel = mongoose.model("Student", studentSchema)
export default StudentModel