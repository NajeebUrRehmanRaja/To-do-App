import taskModel from "../models/task.model.js";

const createTasks = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!(title && content)) {
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

    task.title = title || task.title;
    task.content = content || task.content;

    await task.save();

    return res.status(200).json({ message: "Note updated successfully", task });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const latestTask = async (req, res) => {
  try {
    const latestTask = await taskModel
      .findOne()
      .sort({ createdAt: -1 })
      .limit(4);
    res.status(200).json(latestTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder || "desc";
    const skip = (page - 1) * limit;
    const search = req.query.search || "";
    const completed = req.query.completed || false;

    const query = { title: { $regex: search, $options: "i" }, completed };

    const allTasks = await taskModel
      .find(query)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit);

    res.status(200).json({ message: "tasks fetched", tasks: allTasks });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await taskModel.findByIdAndDelete(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task Not Found!" });
    }
    return res.status(200).json({ message: "Task Deletd Succesfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const completeTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await taskModel.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task Not Found!" });
    }
    task.completed = !task.completed;
    await task.save();
    return res.status(200).json({ message: "Task completed Successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export {
  createTasks,
  updateTask,
  latestTask,
  getAllTasks,
  deleteTask,
  completeTask,
};
