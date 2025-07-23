import express from 'express';
import {createStudent, getAllStudent, getStudent, updateStudent, deleteStudent} from '../controllers/studentController.js'
import {verifyToken, checkAdmin} from '../config/authMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, checkAdmin, getAllStudent);
router.get('/:id', verifyToken, checkAdmin, getStudent)
router.post('/', verifyToken, checkAdmin, createStudent)
router.put('/:id', verifyToken, checkAdmin, updateStudent)
router.delete('/:id', verifyToken, checkAdmin, deleteStudent)

export default router;