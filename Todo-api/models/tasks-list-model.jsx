import mongoose, { Schema } from "mongoose";

const taskListSchema = new Schema({
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task",
        },
    ],
});

export const TaskList = mongoose.model("TaskList", taskListSchema);