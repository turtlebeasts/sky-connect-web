import api from "../../../api/axios";

export const getFeedPosts = async (page = 1, limit = 10) => {
  const response = await api.get(`/posts?page=${page}&limit=${limit}`);
  return response.data;
};

export const getUserPosts = async (username) => {
  const response = await api.get(`/posts/user/${username}`);
  return response.data;
};

export const getPostById = async (id) => {
  const response = await api.get(`/posts/${id}`);
  return response.data;
};

export const createPost = async (formData) => {
  const response = await api.post("/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const updatePost = async (id, data) => {
  const response = await api.patch(`/posts/${id}`, data);
  return response.data;
};

export const deletePost = async (id) => {
  const response = await api.delete(`/posts/${id}`);
  return response.data;
};

export const likePost = async (id) => {
  const response = await api.post(`/posts/${id}/like`);
  return response.data;
};

export const unlikePost = async (id) => {
  const response = await api.delete(`/posts/${id}/like`);
  return response.data;
};
