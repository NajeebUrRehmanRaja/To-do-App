import taskModel from "../models/task.model.js";

const createTasks = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!(title && content)){
        return res.status(400).json({ message: "All Fields are required!" });
  }
    const task = await taskModel.create({ title, content });
    if (!task) {
      return res
        .status(500)
        .json({ message: "Something Went Wrong While Creating Task" });
    }
    return res.status(201).json({ message: "Task Created Succesfully!", task });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, content } = req.body;
    if (!(title || content)) {
      return res.status(400).json({
        message: "Please provide at least title or content to update note",
        task,
      });
    }

    const task = await taskModel.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task Not Found!" });
    }

    task.title = value.title || task.title;
    task.content = value.content || task.content;

    await task.save();

    return res.status(200).json({ message: "Note updated successfully", task });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const latestTask = async (req, res) => {
  try {
    const latestTask = await taskModel.findOne().sort({ createdAt: -1 }).limit(4);
    res.status(200).json(latestTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const allTasks = await taskModel.find().sort({ createdAt: -1 }).skip(0);
    res.json(allTasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await taskModel.findByIdAndDelete(taskId)
    if (!task) {
      return res.status(404).json({ message: "Task Not Found!" });
    }
    return res.status(200).json({ message: "Task Deletd Succesfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { createTasks, updateTask , latestTask, getAllTasks };
