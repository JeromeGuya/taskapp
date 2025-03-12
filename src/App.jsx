import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import CreateTask from "./pages/post/CreateTask";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/add-task" element={<CreateTask />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
