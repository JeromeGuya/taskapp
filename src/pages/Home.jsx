import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { api } from "../lib/api";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.getTask();
        setTasks(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleDone = async (id) => {
    try {
      const res = await api.updateTask(id, { task_status: "Completed" });
      if (res.error) {
        setError(res.error);
        toast.error("Cannot update task");
      }

      setTasks((prevTask) =>
        prevTask.map((task) =>
          task.id === id ? { ...task, task_status: res.data.task_status } : task
        )
      );
      toast.success(`Task updated successfully`);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleRevert = async (id) => {
    try {
      const res = await api.updateTask(id, { task_status: "Pending" });

      setTasks((prevTask) =>
        prevTask.map((task) =>
          task.id === id ? { ...task, task_status: res.data.task_status } : task
        )
      );

      toast.success(`Task reverted successfully`);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await api.deleteTask(id);
      if (res.error) {
        setError(res.error);
        toast.error("Cannot delete task");
      }

      toast.success(`Task deleted successfully`);
      setTasks((prevTask) => prevTask.filter((task) => task.id !== id));
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <ToastContainer />
      <h1 className="title">All Task</h1>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div
            key={task.id}
            className="mb-4 p-4 border rounded-md border-dashed border-slate-400"
          >
            <button
              onClick={() => handleDelete(task.id)}
              className="float-right w-6 h-6 bg-red-500 text-white rounded-full hover:bg-red-600"
              title="Delete task"
            >
              <FaTrash className="text-white ml-1" />
            </button>
            <div className="mb-2 flex justify-between">
              <div>
                <h2 className="font-bold text-2xl">{task.task_name}</h2>
                <small className="text-xs text-slate-600">
                  Description: {task.task_description} on {""}{" "}
                  {new Date(task.created_at).toLocaleTimeString()}
                </small>
              </div>
            </div>
            <p
              className={`font-semibold ${
                task.task_status === "Pending"
                  ? "text-yellow-500"
                  : "text-green-500"
              }`}
            >
              {task.task_status}
            </p>
            <button
              className={`${
                task.task_status === "Pending"
                  ? "mt-2 bg-green-500 p-2 text-white rounded-lg"
                  : "bg-gray-500 cursor-not-allowed mt-2 p-2 text-white rounded-lg"
              }`}
              onClick={() => handleDone(task.id)}
            >
              Mark as done
            </button>
            <button
              className={`${
                task.task_status === "Completed"
                  ? "mt-2 ml-2 bg-red-500 p-2 text-white rounded-lg"
                  : "bg-gray-500 cursor-not-allowed mt-2 ml-2 p-2 text-white rounded-lg"
              }`}
              onClick={() => handleRevert(task.id)}
            >
              Revert
            </button>
          </div>
        ))
      ) : (
        <p>No task found</p>
      )}
    </>
  );
}
