import React, { useState } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";

const HeroSection = () => {
  const [inputValue, setInputValue] = useState("");
  const [taskList, setTaskList] = useState([]);

  const handleAddTask = () => {
    if (!inputValue.trim()) return;

    // Add task to local state
    const updatedTasks = [...taskList, inputValue.trim()];
    setTaskList(updatedTasks);

    // Show toast
    toast.success("New Task Added!", {
      hideProgressBar: true,
      autoClose: 2000,
      position: "bottom-right",
      theme: "colored",
    });

    // Clear input
    setInputValue("");
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
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <input
          type="text"
          id="taskInput"
          className="border border-gray-300 rounded w-full p-20"
          placeholder="Write Here..."
          value={inputValue}
          // onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className={`mt-4 sm:ml-2 bg-blue-500 text-white px-6 py-3 rounded cursor-pointer hover:bg-blue-600 transition duration-300 ${
            !inputValue.trim() ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleAddTask}
          disabled={!inputValue.trim()}
        >
          Add Task
        </button>
      </div>

      {/* 🆕 Display current tasks */}
      {taskList.length > 0 && (
        <div className="mt-6 text-left">
          <h2 className="text-lg font-semibold mb-2">New Tasks:</h2>
          <ul className=" ml-6">
            {taskList.map((task, idx) => (
              <li key={idx}>{task}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Link to previous tasks */}
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
