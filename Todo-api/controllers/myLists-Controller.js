import { TaskList } from "../models/tasks-list-model";  

export const createTaskList = async (req, res) => {
    try {
        const { error } = validateTaskList(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const taskList = new TaskList({
            tasks: req.body.tasks,
        });

        await taskList.save();
        res.status(201).send(taskList);
    }
    catch (err) {
        console.error("Error creating task list:", err);
        res.status(500).send("Internal Server Error");
    }
}