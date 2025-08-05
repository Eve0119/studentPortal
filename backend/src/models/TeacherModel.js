import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
    lastName: {
        type: String, required: true
    },
    firstName: {
        type: String, required: true
    },
    middleInitial: {
        type: String, required: true
    },
    email: {
        type: String, required: true, unique: true
    },
    assignedGradeLevel: {
    type: [String],
    required: true,
    enum: ['Pre-K', 'Kindergarten', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6']
    },
    contactNumber: {type: String },
    address: {
        street: { type: String, required: true },
        barangay: { type: String, required: true },
        city: { type: String, required: true },
        zip: { type: String, required: false }
    },
    dateOfBirth: {
        type: Date, required: true
    },
    gender: {
        type: String, enum: ['Male', 'Female'], required: true
    },
    civilStatus: {
        type: String, enum: ['Single', 'Married', 'Widowed', 'Divorced'], required: true
    },
    benefits: {
        sssNumber: { type: String, required: false },
        philHealthNumber: { type: String, required: false },
        pagIbigNumber: { type: String, required: false },
        tinNumber: { type: String, required: false }
    },
    dateHired: {
        type: Date, required: true
    },
})

const TeacherModel = mongoose.model('Teacher', teacherSchema);
export default TeacherModel;