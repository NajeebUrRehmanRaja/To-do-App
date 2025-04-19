import React, { useState } from 'react'
import { Link } from 'react-router';
import { toast } from "react-toastify";

const HeroSection = () => {
  const [inputValue, setInputValue] = useState("");
  const showToast = () => {
     toast.success("New Task Added!", {
       hideProgressBar: true,
       autoClose: 2000, // optional, sets how long toast stays visible
       position: "bottom-right", // optional, sets the position of the toast
       theme: "colored", // optional for colored theme
     });
  };
  return (
    <div className="mx-auto mt-70 border text-center w-150 p-10 rounded-lg shadow-lg bg-white">
      <h1 className="text-4xl font-bold mb-4">Create your Daily Tasks!</h1>
      <div>
        {/* <label htmlFor="taskInput" className="text-lg font-semibold mr-2"> Task: </label> */}
        <input
          type="text"
          id="taskInput"
          className="border border-gray-300 rounded px-10 py-3"
          placeholder="Add New Task"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className={`ml-2 bg-blue-500 text-white px-10 py-3 rounded cursor-pointer hover:bg-blue-600 transition duration-300 ${!inputValue.trim() ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={showToast}
          disabled={!inputValue.trim()}
        >
          Add Task
        </button>
        {/* <Link to="/mylists" className="cursor-pointer text-sm underline text-blue-600 flex ml-105 mt-1 ">MyLists</Link> */}
      </div>
    </div>
  );
}

export default HeroSection