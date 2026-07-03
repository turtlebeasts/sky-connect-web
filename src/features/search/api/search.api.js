import api from "../../../api/axios";

export const searchUsers = async (query) => {
  const response = await api.get("/users/search", {
    params: {
      q: query,
    },
  });

  return response.data;
};
