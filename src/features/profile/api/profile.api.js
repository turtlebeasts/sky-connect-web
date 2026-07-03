import api from "../../../api/axios";

export const getProfile = async (username) => {
  const response = await api.get(`/users/${username}`);
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await api.patch("/users/me", data);
  return response.data;
};
