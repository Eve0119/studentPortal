import express from 'express';
import {createStudent, getAllStudent, getStudent, updateStudent, deleteStudent} from '../controllers/studentController.js'
import {verifyToken, checkPermission} from '../config/authMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, checkPermission, getAllStudent);
router.get('/:id', verifyToken, checkPermission, getStudent)
router.post('/', verifyToken, checkPermission, createStudent)
router.put('/:id', verifyToken, checkPermission, updateStudent)
router.delete('/:id', verifyToken, checkPermission, deleteStudent)

export default router;