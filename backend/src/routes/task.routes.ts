import express from 'express';
import { protect } from '../middleware/auth.middleware';
import validate from '../middleware/validate.middleware';
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask
} from '../controllers/task.controller';
import { createTaskSchema, updateTaskSchema } from '../validations/task.validation';

const router = express.Router();

router.use(protect); 

router.route('/')
  .post(validate(createTaskSchema), createTask)
  .get(getTasks);

router.route('/:id')
  .get(getTask)
  .put(validate(updateTaskSchema), updateTask)
  .delete(deleteTask);

export default router;