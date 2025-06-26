import StudentModel from '../models/StudentModel.js'

export async function getAllStudent(_, res){
    try {
        const students = await StudentModel.find().sort({createdAt: -1}) //newest first
        res.status(200).json(students)
    } catch (error) {
        console.error("Error in getAllStudent controller", error)
        res.status(500).json({message: "Internal server error"})
    }
}

export async function getStudent(req, res){
    try {
        const student = await StudentModel.findById(req.params.id)
        if(!student) {
            return res.status(404).json({message: "Student not found"})
        } else {
            res.status(200).json(student)
        }
    } catch (error) {
        
    }
}

export async function createStudent(req, res){
    try {
        const createdStudent = await StudentModel.create(req.body);
        res.status(201).json(createdStudent)
    } catch (error) {
        console.error("Error in createStudent controller", error)
        res.status(500).json({message: "Internal server error"})
    }
}

export async function updateStudent(req, res){
    try {
        const updatedStudent = await StudentModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
        if(!updatedStudent){
            return res.status(404).json({message: "Student not found"})
        } else{
            res.status(200).json(updatedStudent)
        }
    } catch (error) {
        console.error("Error in updateStudent controller", error)
        res.status(500).json({message: "Internal server error"})
    }
}

export async function deleteStudent(req, res){
    try {
        const deleteStudent = await StudentModel.findByIdAndDelete(req.params.id)
        if(!deletedStudent){
            return res.status(404).json({message: "Student not found"})
        } else{
            res.status(200).json({message:'Deleted Successfully'})
        }
    } catch (error) {
        console.error("Error in deleteStudent controller", error)
        res.status(500).json({message: "Internal server error"})
    }
}