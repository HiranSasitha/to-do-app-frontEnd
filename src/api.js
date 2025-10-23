import axios from "axios";

const API_BASE = "http://localhost:8080/tasks";
// const API_BASE = process.env.REACT_APP_BACKEND_URL;

export const createTask = (task) => axios.post(`${API_BASE}/create`, task);

export const getTasks = (page = 0, size = 5) =>
    axios.get(`${API_BASE}/get-task/${page}/${size}`);

export const markTaskDone = (id,mark) =>
    axios.put(`${API_BASE}/update/${id}/${mark}`);

export const getCount = () =>
    axios.get(`${API_BASE}/count`);
