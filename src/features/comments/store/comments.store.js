import { create } from "zustand";

import {
  getPostComments,
  createComment,
  updateComment,
  deleteComment,
} from "../api/comments.api";

const useCommentsStore = create((set) => ({
  commentsByPost: {},

  isLoading: false,
  error: null,

  fetchComments: async (postId) => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      const data = await getPostComments(postId);

      set((state) => ({
        commentsByPost: {
          ...state.commentsByPost,
          [postId]: data.comments,
        },
        isLoading: false,
      }));
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to fetch comments.",
      });
    }
  },

  createComment: async (postId, commentData) => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      const data = await createComment(postId, commentData);

      set((state) => ({
        commentsByPost: {
          ...state.commentsByPost,
          [postId]: [...(state.commentsByPost[postId] || []), data.comment],
        },
        isLoading: false,
      }));

      return {
        success: true,
      };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to create comment.";

      set({
        isLoading: false,
        error: message,
      });

      return {
        success: false,
        message,
      };
    }
  },

  updateComment: async (postId, commentId, commentData) => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      const data = await updateComment(commentId, commentData);

      set((state) => ({
        commentsByPost: {
          ...state.commentsByPost,
          [postId]: (state.commentsByPost[postId] || []).map((comment) =>
            comment._id === commentId ? data.comment : comment,
          ),
        },
        isLoading: false,
      }));

      return {
        success: true,
      };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to update comment.";

      set({
        isLoading: false,
        error: message,
      });

      return {
        success: false,
        message,
      };
    }
  },

  deleteComment: async (postId, commentId) => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      await deleteComment(commentId);

      set((state) => ({
        commentsByPost: {
          ...state.commentsByPost,
          [postId]: (state.commentsByPost[postId] || []).filter(
            (comment) => comment._id !== commentId,
          ),
        },
        isLoading: false,
      }));

      return {
        success: true,
      };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to delete comment.";

      set({
        isLoading: false,
        error: message,
      });

      return {
        success: false,
        message,
      };
    }
  },

  clearComments: (postId) => {
    set((state) => {
      const commentsByPost = { ...state.commentsByPost };
      delete commentsByPost[postId];

      return {
        commentsByPost,
      };
    });
  },

  clearAllComments: () => {
    set({
      commentsByPost: {},
    });
  },

  clearError: () => {
    set({
      error: null,
    });
  },
}));

export default useCommentsStore;
