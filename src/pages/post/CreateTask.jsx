import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/api";

export default function CreateTask() {
  const [forms, setForms] = useState({
    task_name: "",
    task_description: "",
  });

  const navigate = useNavigate();

  const [error, setError] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(forms);

    try {
      const res = await api.createTask(forms);
      if (res.error) {
        setError(res.error);
      }

      toast.success("Task created successfully");
      navigate("/");
    } catch (error) {
      console.error(error);
      setError({ task_name: "Task name is required" });
    }
  };

  return (
    <>
      <h1 className="title">Create task</h1>
      <form className="w-1/2 mx-auto space-y-6" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Task name"
            value={forms.task_name}
            onChange={(e) =>
              setForms((prevForm) => ({
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
            value={forms.task_description}
            onChange={(e) =>
              setForms((prevForm) => ({
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
