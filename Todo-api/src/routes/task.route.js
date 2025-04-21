import { Router } from 'express';
import { createTasks, getAllTasks, latestTask, updateTask } from '../controllers/task.controller.js';

const router = Router();

router.post("/", createTasks);
router.patch("/:taskId", updateTask);
router.get('/latest', latestTask);
router.get("/", getAllTasks);

export default router;