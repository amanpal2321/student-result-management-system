import axios from "axios";
import { getToken } from "../utils/auth";

const api = axios.create({
  baseURL: "https://student-result-management-system-pm3r.onrender.com",
  withCredentials: false
});

api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
