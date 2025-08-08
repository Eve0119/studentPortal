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
    const { email, ...rest } = req.body;
    
    // 1. Fast MongoDB check first (indexed query)
    const existingTeacher = await TeacherModel.findOne({ email }).select('_id').lean();
    if (existingTeacher) {
        return res.status(409).json({ 
            error: {
                code: 'EMAIL_EXISTS',
                message: 'Email already registered'
            }
        });
    }

    try {
        // 2. Firebase operations
        const tempPassword = Math.random().toString(36).slice(-8);
        const userRecord = await adminAuth.createUser({
            email,
            password: tempPassword,
            emailVerified: false,
        });

        // 3. Parallelize non-dependent operations
        const [resetLink] = await Promise.all([
            adminAuth.generatePasswordResetLink(email),
            TeacherModel.create({
                email,
                firebaseUid: userRecord.uid,
                ...rest
            }),
            adminAuth.setCustomUserClaims(userRecord.uid, { role: "teacher" })
        ]);

        // 4. Fire-and-forget email (don't await)
        sendEmail(
            email,
            "Set Your Password",
            `Please <a href="${resetLink}">set your password</a>`
        ).catch(e => console.error("Email failed:", e));

        return res.status(201).json({
            message: "Teacher created successfully"
        });

    } catch (error) {
        console.error("Error:", error);
        
        // Specific Firebase errors
        if (error.code === 'auth/email-already-exists') {
            return res.status(409).json({
                error: {
                    code: 'EMAIL_EXISTS',
                    message: 'Email already registered'
                }
            });
        }

        return res.status(500).json({ 
            error: {
                code: 'SERVER_ERROR',
                message: 'Internal server error'
            }
        });
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