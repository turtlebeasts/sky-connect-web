import { create } from "zustand";

import { followUser, unfollowUser, getFollowStatus } from "../api/follow.api";

const useFollowStore = create((set, get) => ({
  followStatus: {},
  counts: {},

  isLoading: false,
  error: null,

  fetchFollowStatus: async (username) => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      const data = await getFollowStatus(username);

      set((state) => ({
        followStatus: {
          ...state.followStatus,
          [username]: data.isFollowing,
        },

        isLoading: false,
      }));
    } catch (error) {
      set({
        error:
          error.response?.data?.message || "Failed to fetch follow status.",

        isLoading: false,
      });
    }
  },

  follow: async (username) => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      const data = await followUser(username);

      set((state) => ({
        followStatus: {
          ...state.followStatus,
          [username]: true,
        },

        counts: {
          ...state.counts,

          [username]: {
            followers: data.targetFollowersCount,
            following: state.counts[username]?.following ?? 0,
          },
        },

        isLoading: false,
      }));

      return {
        success: true,
      };
    } catch (error) {
      const message = error.response?.data?.message || "Failed to follow user.";

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

  unfollow: async (username) => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      const data = await unfollowUser(username);

      set((state) => ({
        followStatus: {
          ...state.followStatus,
          [username]: false,
        },

        counts: {
          ...state.counts,

          [username]: {
            followers: data.targetFollowersCount,
            following: state.counts[username]?.following ?? 0,
          },
        },

        isLoading: false,
      }));

      return {
        success: true,
      };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to unfollow user.";

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

  setCounts: (username, followers, following) => {
    set((state) => ({
      counts: {
        ...state.counts,

        [username]: {
          followers,
          following,
        },
      },
    }));
  },

  clearError: () =>
    set({
      error: null,
    }),
}));

export default useFollowStore;
