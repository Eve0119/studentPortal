import TeacherModel from '../models/TeacherModel.js';

export async function getAllTeachers(_, res) {
    try {
        const teachers = await TeacherModel.find().sort({ createdAt: -1 }); // newest first
        res.status(200).json(teachers);
    } catch (error) {
        console.error("Error in getAllTeachers controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getTeacher(req, res) {
    try {
        const teacher = await TeacherModel.findById(req.params.id);
        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        } else {
            res.status(200).json(teacher);
        }
    } catch (error) {
        console.error("Error in getTeacher controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function createTeacher(req, res) {
    try {
        const createdTeacher = await TeacherModel.create(req.body);
        res.status(201).json(createdTeacher);
    } catch (error) {
        console.error("Error in createTeacher controller", error);
        res.status(500).json({ message: "Internal server error" });
    }   
}

export async function updateTeacher(req, res) {
    try {
        const updatedTeacher = await TeacherModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTeacher) {
            return res.status(404).json({ message: "Teacher not found" });
        } else {
            res.status(200).json(updatedTeacher);
        }
    } catch (error) {
        console.error("Error in updateTeacher controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function deleteTeacher(req, res) {
    try {
        const deletedTeacher = await TeacherModel.findByIdAndDelete(req.params.id);
        if (!deletedTeacher) {
            return res.status(404).json({ message: "Teacher not found" });
        } else {
            res.status(200).json({ message: 'Deleted Successfully' });
        }
    } catch (error) {
        console.error("Error in deleteTeacher controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}