const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    ME: "/auth/me",
  },

  POSTS: {
    GET_ALL: "/posts",
    CREATE: "/posts",
    LIKE: (id) => `/posts/${id}/like`,
    COMMENT: (id) => `/posts/${id}/comments`,
  },

  USERS: {
    PROFILE: (username) => `/users/${username}`,
    FOLLOW: (id) => `/users/${id}/follow`,
  },
};

export default ENDPOINTS;
