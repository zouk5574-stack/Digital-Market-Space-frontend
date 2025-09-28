// src/services/auth.js
import api from "./api";

export async function login({ identifier, password }) {
  // backend should support { identifier, password } or { phone/email, password }
  const res = await api.post("/auth/login", { identifier, password });
  return res.data;
}

export async function register(payload) {
  const res = await api.post("/auth/register", payload);
  return res.data;
}

export async function me() {
  const res = await api.get("/auth/me");
  return res.data;
}
