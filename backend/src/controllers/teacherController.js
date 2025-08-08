import { adminAuth } from '../config/firebase-admin.js';
import TeacherModel from '../models/TeacherModel.js';
import { sendEmail } from '../config/sendEmail.js';


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
        const { email, ...rest } = req.body;
        const tempPassword = Math.random().toString(36).slice(-8);

        const userRecord = await adminAuth.createUser({
            email,
            password: tempPassword,
            emailVerified: false,
            disabled: false,
        });

        const resetLink = await adminAuth.generatePasswordResetLink(email);

        // Send password reset link to teacher's email
        await sendEmail(
            email,
            "Set Your Teacher Portal Password",
            `<p>Welcome to Student Portal!<br>
            Please <a href="${resetLink}">click here</a> to set your password.</p>`
        );

        const createdTeacher = await TeacherModel.create({
            email,
            firebaseUid: userRecord.uid,
            ...rest
        });

        const uid  =  userRecord.uid;

        try {
            await adminAuth.setCustomUserClaims(uid, { role: "teacher" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }

        res.status(201).json({
            teacher: createdTeacher,
            message: "Teacher created. Password reset email sent."
        });
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