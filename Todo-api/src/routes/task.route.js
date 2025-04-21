import { Router } from "express";
import {
  createTasks,
  deleteTask,
  getAllTasks,
  latestTask,
  updateTask,
  completeTask,
} from "../controllers/task.controller.js";

const router = Router();

router.post("/", createTasks);
router.patch("/:taskId", updateTask);
router.delete("/:taskId", deleteTask);
router.get("/latest", latestTask);
router.get("/", getAllTasks);
router.patch("/complete/:taskId", completeTask);

export default router;
