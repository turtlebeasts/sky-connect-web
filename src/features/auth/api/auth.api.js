// src/features/auth/api/auth.api.js

import api from "../../../api/axios";

export const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

export const googleLogin = async (token) => {
  const response = await api.post("/auth/google", {
    token,
  });

  return response.data;
};

export const getMe = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};
