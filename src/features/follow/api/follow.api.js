import api from "../../../api/axios";

export const followUser = async (username) => {
  const response = await api.post(`/users/${username}/follow`);
  return response.data;
};

export const unfollowUser = async (username) => {
  const response = await api.delete(`/users/${username}/follow`);
  return response.data;
};

export const getFollowStatus = async (username) => {
  const response = await api.get(`/users/${username}/follow-status`);
  return response.data;
};

export const getFollowers = async (username) => {
  const response = await api.get(`/users/${username}/followers`);
  return response.data;
};

export const getFollowing = async (username) => {
  const response = await api.get(`/users/${username}/following`);
  return response.data;
};
