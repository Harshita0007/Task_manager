import { Router } from 'express';
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskStatus,
} from '../controllers/task.controller';
import { authenticate } from '../middleware/auth';
import {
  createTaskValidation,
  updateTaskValidation,
  taskQueryValidation,
} from '../middleware/validation';

const router = Router();

router.use(authenticate);

router.get('/', taskQueryValidation, getTasks);
router.post('/', createTaskValidation, createTask);
router.get('/:id', getTaskById);
router.patch('/:id', updateTaskValidation, updateTask);
router.delete('/:id', deleteTask);
router.patch('/:id/toggle', toggleTaskStatus);

export default router;