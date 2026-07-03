import { create } from "zustand";

import {
  getFeedPosts,
  getUserPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
} from "../api/posts.api";

const usePostsStore = create((set, get) => ({
  posts: [],
  page: 1,
  hasMore: true,
  isLoading: false,
  error: null,

  fetchPosts: async (page = 1) => {
    try {
      set({ isLoading: true, error: null });

      const data = await getFeedPosts(page);

      set((state) => ({
        posts: page === 1 ? data.posts : [...state.posts, ...data.posts],
        page,
        hasMore: data.posts.length > 0,
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch posts.",
        isLoading: false,
      });
    }
  },

  createPost: async (postData) => {
    try {
      set({ isLoading: true, error: null });

      const data = await createPost(postData);

      set((state) => ({
        posts: [data.post, ...state.posts],
        isLoading: false,
      }));

      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || "Failed to create post.";

      set({
        error: message,
        isLoading: false,
      });

      return {
        success: false,
        message,
      };
    }
  },

  updatePost: async (id, postData) => {
    try {
      set({ isLoading: true, error: null });

      const data = await updatePost(id, postData);

      set((state) => ({
        posts: state.posts.map((post) => (post._id === id ? data.post : post)),
        isLoading: false,
      }));

      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || "Failed to update post.";

      set({
        error: message,
        isLoading: false,
      });

      return {
        success: false,
        message,
      };
    }
  },

  deletePost: async (id) => {
    try {
      set({ isLoading: true, error: null });

      await deletePost(id);

      set((state) => ({
        posts: state.posts.filter((post) => post._id !== id),
        isLoading: false,
      }));

      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || "Failed to delete post.";

      set({
        error: message,
        isLoading: false,
      });

      return {
        success: false,
        message,
      };
    }
  },

  likePost: async (id) => {
    try {
      const data = await likePost(id);

      set((state) => ({
        posts: state.posts.map((post) => (post._id === id ? data.post : post)),
      }));

      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || "Failed to like post.";

      set({ error: message });

      return {
        success: false,
        message,
      };
    }
  },

  unlikePost: async (id) => {
    try {
      const data = await unlikePost(id);

      set((state) => ({
        posts: state.posts.map((post) => (post._id === id ? data.post : post)),
      }));

      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || "Failed to unlike post.";

      set({ error: message });

      return {
        success: false,
        message,
      };
    }
  },

  clearPosts: () => {
    set({
      posts: [],
      page: 1,
      hasMore: true,
    });
  },

  clearError: () => {
    set({
      error: null,
    });
  },

  fetchUserPosts: async (username) => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      const data = await getUserPosts(username);

      set({
        posts: data.posts,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch user posts.",
        isLoading: false,
      });
    }
  },
}));

export default usePostsStore;
