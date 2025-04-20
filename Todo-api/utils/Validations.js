import joi from "joi";

const todoSchema = joi.object({
  title: joi.string().min(1).max(100).required(),
    description: joi.string().min(1).max(500).required(),
    completed: joi.boolean().optional(),
});

const TaskUpdateSchema = joi.object({
    title: joi.string().min(1).max(100).required(),
    description: joi.string().min(1).max(500).required(),
    completed: joi.boolean().optional(),
});

export { todoSchema, validateTodo };