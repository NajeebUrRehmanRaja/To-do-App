import React, { useEffect, useState } from "react";
import Navbar from "../Pages/Navbar";
import axiosInstance from "../lib/axios";

const MyLists = () => {
  const [loading, setLoading] = useState(false);
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/tasks");
        const tasks = res.data.tasks;
        setTaskList(tasks);
      } catch (error) {
        console.log("Something went wrong while fetching tasks: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="mt-20">
      <Navbar />
      {taskList.length > 0 ? (
        <ul className="ml-6">
          {taskList.map((task, idx) => (
            <li
              key={idx}
              className="mb-2 bg-gray-50 border border-gray-300 rounded p-4"
            >
              <strong>{task.title}</strong>
              {task.content && <p className="text-gray-600">{task.content}</p>}
              <div className="flex justify-end ">
                <button className="border bg-red-500 text-white px-4 py-1 rounded cursor-pointer">
                  Delete
                </button>
                <button className="border bg-green-500 text-white px-4 py-1 rounded cursor-pointer">
                  Edit
                </button>
                <button className="border bg-blue-500 text-white px-4 py-1 rounded cursor-pointer">
                  Complete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks yet.</p>
      )}
    </div>
  );
};

export default MyLists;
