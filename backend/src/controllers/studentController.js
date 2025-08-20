import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "../config/s3Client.js";
import StudentModel from "../models/StudentModel.js";

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
        console.error("Error in getStudent controller", error)
        res.status(500).json({message: "Internal server error"})
    }
}

export async function createStudent(req, res) {
    try {
        const { email, profileImage } = req.body;

        // 1. Check for duplicate email
        const existingStudent = await StudentModel.findOne({ email });
        if (existingStudent) {
            // Delete orphaned image if duplicate exists
            if (profileImage?.key) {
                await s3Client.send(new DeleteObjectCommand({
                    Bucket: process.env.S3_BUCKET,
                    Key: profileImage.key
                }));
            }
            return res.status(409).json({ 
                message: "Email already exists",
                error: "DUPLICATE_EMAIL" 
            });
        }

        // 2. Create student with proper image data structure
        const createdStudent = await StudentModel.create({
            ...req.body,
            profileImage: profileImage ? {
                url: profileImage.url,
                key: profileImage.key
            } : null
        });

        // 3. Return success response
        res.status(201).json({
            message: "Student created successfully",
            student: createdStudent
        });

    } catch (error) {
        console.error("Error in createStudent controller:", error);

        // Cleanup uploaded image if creation fails
        if (req.body.profileImage?.key) {
            try {
                await s3Client.send(new DeleteObjectCommand({
                    Bucket: process.env.S3_BUCKET,
                    Key: req.body.profileImage.key
                }));
            } catch (s3Error) {
                console.error("Failed to cleanup image:", s3Error);
            }
        }

        // Error response
        res.status(500).json({
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined,
            code: "INTERNAL_SERVER_ERROR"
        });
    }
}

export async function updateStudent(req, res) {
    try {
        const { id } = req.params;
        const { profileImage } = req.body;

        // 1. Get the existing student data
        const existingStudent = await StudentModel.findById(id);
        if (!existingStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        // 2. If updating profile image, delete the old one
        if (profileImage?.key && existingStudent.profileImage?.key) {
            try {
                await s3Client.send(new DeleteObjectCommand({
                    Bucket: process.env.S3_BUCKET,
                    Key: existingStudent.profileImage.key
                }));
            } catch (s3Error) {
                console.error("Failed to delete old image:", s3Error);
                // Continue with update even if deletion fails
            }
        }

        // 3. Perform the update
        const updatedStudent = await StudentModel.findByIdAndUpdate(
            id,
            {
                ...req.body,
                profileImage: profileImage ? {
                    url: profileImage.url,
                    key: profileImage.key
                } : existingStudent.profileImage
            },
            { new: true }
        );

        res.status(200).json(updatedStudent);
    } catch (error) {
        console.error("Error in updateStudent controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function deleteStudent(req, res) {
    try {
        const student = await StudentModel.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        // Delete associated profile image if exists
        if (student.profileImage?.key) {
            try {
                await s3Client.send(new DeleteObjectCommand({
                    Bucket: process.env.S3_BUCKET,
                    Key: student.profileImage.key
                }));
            } catch (s3Error) {
                console.error("Failed to delete image:", s3Error);
            }
        }

        res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
        console.error("Error in deleteStudent controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}