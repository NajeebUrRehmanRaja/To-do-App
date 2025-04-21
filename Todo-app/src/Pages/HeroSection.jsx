import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../lib/axios";
import { useEffect } from "react";

const HeroSection = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await axiosInstance.get("/tasks?limit=4");
      const tasks = res.data.tasks;
      setTaskList(tasks);
    } catch (error) {
      console.log("Something went wrong while fetching tasks: ", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (!title.trim()) return;

    const newTask = {
      title: title.trim(),
      content: description.trim(),
    };
    try {
      const res = await axiosInstance.post("/tasks", newTask);
      if (res.status === 201) {
        setTaskList([res.data.task, ...taskList]);

        toast.success("New Task Added!", {
          hideProgressBar: true,
          autoClose: 2000,
          position: "bottom-right",
          theme: "colored",
        });

        // Clear inputs
        setTitle("");
        setDescription("");
      }
    } catch (error) {
      console.log("error while adding task", error);
      toast.error("Error Found", {
        hideProgressBar: true,
        autoClose: 2000,
        position: "bottom-right",
        theme: "colored",
      });
    }
  };

  const editTask = async () => {
    try {
      const res = await axiosInstance.patch(`/tasks/${editTaskId}`, {
        title,
        content: description,
      });
      if (res.status == 200) {
        const updatedTasks = taskList.map((t) => {
          if (t._id === editTaskId) {
            return res.data.task;
          }
          return t;
        });
        setTaskList(updatedTasks);
      }
    } catch (error) {
      console.log("Error while updating task", error);
    } finally {
      setIsEdit(false);
      setTitle("");
      setDescription("");
      setEditTaskId(null);
    }
  };

  useEffect(() => {
    if (taskList.length > 4) {
      setTaskList(taskList.slice(0, 4));
    }
  }, [taskList]);

  const handleDeleteTask = async (id) => {
    const res = await axiosInstance.delete(`/tasks/${id}`);
    if (res.status === 200) {
      fetchTasks();
    }

    toast.error("Task Deleted!", {
      hideProgressBar: true,
      autoClose: 2000,
      position: "bottom-right",
      theme: "colored",
    });
  };
  const handleEditTask = async (task) => {
    setIsEdit(true);
    setTitle(task.title);
    setDescription(task.content);
    setEditTaskId(task._id);
  };

  const handleCompleteTask = async (id) => {
    const res = await axiosInstance.patch(`/tasks/complete/${id}`);
    console.log("res", res.data);
    if (res.status === 200) {
      fetchTasks();
    }

    toast.info("Task Completed!", {
      hideProgressBar: true,
      autoClose: 2000,
      position: "bottom-right",
      theme: "colored",
    });
  };
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
          onClick={isEdit ? editTask : handleAddTask}
          disabled={!title.trim()}
        >
          {isEdit ? "Update Task" : "Add Task"}
        </button>
      </div>

      {taskList.length > 0 && (
        <div className="mt-6 text-left">
          <h2 className="text-lg font-semibold mb-2">New Tasks:</h2>
          <ul className="ml-6">
            {taskList.map((task) => (
              <li
                key={task._id}
                className="mb-2 bg-gray-50 border border-gray-300 rounded p-4"
              >
                <strong>{task.title}</strong>
                {task.content && (
                  <p className="text-gray-600">{task.content}</p>
                )}
                <div className="flex justify-end ">
                  <button
                    className="border bg-red-500 text-white px-4 py-1 rounded cursor-pointer"
                    onClick={() => handleDeleteTask(task._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="border bg-green-500 text-white px-4 py-1 rounded cursor-pointer"
                    onClick={() => handleEditTask(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="border bg-blue-500 text-white px-4 py-1 rounded cursor-pointer"
                    onClick={() => handleCompleteTask(task._id)}
                  >
                    Complete
                  </button>
                </div>
              </li>
            ))}
          </ul>
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
