import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/api/tasks");
        const data = await res.json();
        setTasks(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <ToastContainer />
      <h1 className="title">All Task</h1>
      <p className="text-black">{tasks.name}</p>
    </>
  );
}
