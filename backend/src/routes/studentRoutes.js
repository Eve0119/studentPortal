import express from 'express';
import {createStudent, getAllStudent, getStudent, updateStudent, deleteStudent} from '../controllers/studentController.js'

const router = express.Router();

router.get('/', getAllStudent);
router.get('/:id', getStudent)
router.post('/', createStudent)
router.put('/:id', updateStudent)
router.delete('/:id', deleteStudent)

export default router;