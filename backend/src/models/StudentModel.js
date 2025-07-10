import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema({
    lastName: {
        type:String, required:true
    },
    firstName: {
        type:String,
        required:true
    },
    middleInitial: {
        type:String, required:true
    },
    studentId: {
        type:String, required:true
    },
    dateOfBirth: {
        type:Date, required:true
    },
    gender: {
        type: String, enum: ['male', 'female'], required:true
    },
    contactNumber: {
        type:String, required:false
    },
    address: {
        street: { type: String, required: true },
        barangay: {type: String, required: true},
        city: { type: String, required: true },
        zip: { type: String, required: false}
    },
    grade: {
        type:String, required:true
    },
    parentGuardianName: {
        type:String, required:false
    },
    parentEmail: {
        type:String, required:false
    },
    parentContactNumber: {
        type:String, required:false
    },
    enrollmentDate: {
        type: Date, required: true
    },
    grades: {
        generalAverage: { type: String, required: false },
    },
    attendance: {
        attendanceRate: {type:Number, required: false}
    },
    adviser: {
        type: String, required: false
    }
},{
    timestamps:true
})

const StudentModel = mongoose.model("Student", studentSchema)
export default StudentModel