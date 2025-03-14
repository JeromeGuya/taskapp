import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { toast } from "sonner";
import { useParams, useNavigate } from "react-router-dom";

export default function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [task, setTask] = useState({
    task_name: "",
    task_description: "",
  });

  const fetchTask = async () => {
    try {
      const res = await api.showTask(id);
      setTask(res.data);
      console.log(task);
    } catch (error) {
      toast.error("Cannot fetch task");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      task_name: task.task_name,
      task_description: task.task_description,
      task_status: "Pending",
    };

    if (!newTask.task_name && !newTask.task_description) {
      setError({
        task_name: "Task name is required",
        task_description: "Task description is required",
      });
      return;
    }

    try {
      const res = await api.updateInfoTask(id, newTask);
      if (res.error) {
        setError(res.error);
        toast.error("Cannot update task");
      }
      toast.success("Task updated successfully");
      navigate("/");
    } catch (error) {
      console.error(error);
      setError({ message: "Something went wrong" });
    }
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  return (
    <>
      <h1 className="title">Edit task</h1>
      <form className="w-1/2 mx-auto space-y-6" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Task name"
            value={task.task_name}
            onChange={(e) =>
              setTask((prevForm) => ({
                ...prevForm,
                task_name: e.target.value,
              }))
            }
          />
          {error.task_name && <p className="error">{error.task_name}</p>}
        </div>
        <div>
          <textarea
            name="task_description"
            id="task_description"
            placeholder="Description"
            rows="6"
            value={task.task_description}
            onChange={(e) =>
              setTask((prevForm) => ({
                ...prevForm,
                task_description: e.target.value,
              }))
            }
          ></textarea>
          {error.task_description && (
            <p className="error">{error.task_description}</p>
          )}
        </div>

        <button className="primary-btn">Add Task</button>
      </form>
    </>
  );
}
