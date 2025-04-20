import express from 'express';
import { router } from 'express';
import TasksList from '../models/TasksList-model.js';

router.post("/", async (req, res) => {
  try {
    const newTask = new Task({ title: req.body.title });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/latest', async (req, res) => {
  try {
    const latestTask = await Task.findOne().sort({ createdAt: -1 }).limit(4);
    res.status(200).json(latestTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
);
router.get("/", async (req, res) => {
  try {
    const allTasks = await Task.find().sort({ createdAt: -1 }).skip(0);
    res.json(allTasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;