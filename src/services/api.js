// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: (import.meta.env.VITE_API_URL || "") + "/api",
  headers: { "Content-Type": "application/json" },
  timeout: 20000
});

// Interceptor to add token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("dms_token") || sessionStorage.getItem("dms_token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
