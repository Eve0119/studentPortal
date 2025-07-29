import express from 'express';
import { createTeacher, getAllTeachers, getTeacher, updateTeacher, deleteTeacher} from '../controllers/teacherController';
import { verifyToken, checkPermission } from '../config/authMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, checkPermission, getAllTeachers);
router.get('/:id', verifyToken, checkPermission, getTeacher);
router.post('/', verifyToken, checkPermission, createTeacher);
router.put('/:id', verifyToken, checkPermission, updateTeacher);
router.delete('/:id', verifyToken, checkPermission, deleteTeacher);

export default router;