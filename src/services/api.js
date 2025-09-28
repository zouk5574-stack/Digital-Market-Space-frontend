// src/services/api.js — centralized axios instance with auth & error handling
import axios from "axios";
import { toast } from "react-hot-toast";

const api = axios.create({
  baseURL: (import.meta.env.VITE_API_URL || "") + "/api",
  headers: { "Content-Type": "application/json" },
  timeout: 20000,
  withCredentials: false
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("dms_token") || sessionStorage.getItem("dms_token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (err) => Promise.reject(err));

// Global response handler: handle 401 -> redirect to login, show toast
api.interceptors.response.use(
  response => response,
  error => {
    try {
      const status = error?.response?.status;
      if (status === 401) {
        // clear token and redirect to login
        localStorage.removeItem("dms_token");
        sessionStorage.removeItem("dms_token");
        toast.error('Session expirée. Veuillez vous reconnecter.');
        // Redirect after slight delay so toast shows
        setTimeout(() => { window.location.href = '/login'; }, 700);
      } else if (status >= 400 && status < 500) {
        const msg = error.response?.data?.message || error.response?.data?.error || 'Erreur client';
        toast.error(msg);
      } else if (status >= 500) {
        toast.error('Erreur serveur. Réessaye plus tard.');
      }
    } catch (e) {
      // ignore processing errors
      console.error("Error handling response:", e);
    }
    return Promise.reject(error);
  }
);

export default api;
