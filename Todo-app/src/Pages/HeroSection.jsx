import React, { useState } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";

const HeroSection = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskList, setTaskList] = useState([]);

  const handleAddTask = () => {
    if (!title.trim()) return;

    const newTask = {
      title: title.trim(),
      description: description.trim(),
    };

    setTaskList([...taskList, newTask]);

    toast.success("New Task Added!", {
      hideProgressBar: true,
      autoClose: 2000,
      position: "bottom-right",
      theme: "colored",
    });

    // Clear inputs
    setTitle("");
    setDescription("");
  };

 
  const handleDeleteTask = (index) => {
    const updatedTasks = taskList.filter((_, idx) => idx !== index);
    setTaskList(updatedTasks);

    toast.error("Task Deleted!", {
      hideProgressBar: true,
      autoClose: 2000,
      position: "bottom-right",
      theme: "colored",
    });
  }
  const handleEditTask = (index) => {
    const updatedTasks = [...taskList];
    const taskToEdit = updatedTasks[index];
    setTitle(taskToEdit.title);
    setDescription(taskToEdit.description);
    updatedTasks.splice(index, 1);
    setTaskList(updatedTasks);
  }

  const handleCompleteTask = (index) => {
    const updatedTasks = [...taskList];
    const taskToComplete = updatedTasks[index];
    taskToComplete.completed = !taskToComplete.completed;
    setTaskList (updatedTasks); 
    updatedTasks.splice(index, 1);
    setTaskList(updatedTasks);
    toast.info("Task Completed!", {
      hideProgressBar: true,
      autoClose: 2000,
      position: "bottom-right",
      theme: "colored",
    });
  }
  return (
    <div className="mx-auto mt-30 border text-center w-[90%] max-w-xl p-10 rounded-lg shadow-lg bg-white">
      <h1 className="text-4xl font-bold mb-4">Create your Daily Tasks!</h1>
      <div className="flex flex-col justify-center items-center gap-5">
        <input
          type="text"
          id="taskheading"
          className="border border-gray-300 rounded w-full p-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          name=""
          id="textarea"
          className="border border-gray-300 rounded w-full h-[200px] px-2 pt-3 pb-10"
          placeholder="Write Here..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          cols="30"
          rows="10"
        >
          {" "}
        </textarea>
        <button
          className={`mt-4 sm:ml-2 bg-blue-500 text-white px-6 py-3 rounded cursor-pointer hover:bg-blue-600 transition duration-300 ${
            !title.trim() ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleAddTask} 
          disabled={!title.trim()}
        >
          Add Task
        </button>
      </div>

      {taskList.length > 0 && (
        <div className="mt-6 text-left">
          <h2 className="text-lg font-semibold mb-2">New Tasks:</h2>
          <div className="border border-gray-300 rounded p-4 bg-gray-50">
            <ul className="ml-6">
              {taskList.map((task, idx) => (
                <li key={idx} className="mb-2">
                  <strong>{task.title}</strong>
                  {task.description && (
                    <p className="text-gray-600">{task.description}</p>
                  )}
                  <div className="flex justify-end ">
                    <button
                      className="border bg-red-500 text-white px-4 py-1 rounded cursor-pointer"
                      onClick={() => handleDeleteTask(idx)}
                    >
                      Delete
                    </button>
                    <button
                      className="border bg-green-500 text-white px-4 py-1 rounded cursor-pointer"
                      onClick={() => handleEditTask(idx)}
                    >
                      Edit
                    </button>
                    <button
                      className="border bg-blue-500 text-white px-4 py-1 rounded cursor-pointer"
                      onClick={() => handleCompleteTask(idx)}
                    >
                      Complete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <Link
        to="/mylists"
        className="mt-6 inline-block text-blue-600 underline text-sm"
      >
        View MyLists
      </Link>
    </div>
  );
};

export default HeroSection;
