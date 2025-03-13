import ky from "ky";

const API_BASE_URL = "http://127.0.0.1:8000/api";

export const api = {
  getTask: () => ky.get(`${API_BASE_URL}/tasks`).json(),
  createTask: (task) => ky.post(`${API_BASE_URL}/tasks`, { json: task }).json(),
  updateTask: (id, task) =>
    ky.put(`${API_BASE_URL}/tasks/${id}`, { json: task }).json(),
  showTask: (id) => ky.get(`${API_BASE_URL}/tasks/${id}`).json(),
  deleteTask: (id) => ky.delete(`${API_BASE_URL}/tasks/${id}`).json(),
};
