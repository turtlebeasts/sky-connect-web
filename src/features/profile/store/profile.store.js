import { create } from "zustand";

import { getProfile, updateProfile } from "../api/profile.api";

const useProfileStore = create((set) => ({
  profile: null,

  followersCount: 0,
  followingCount: 0,

  isLoading: false,
  error: null,

  fetchProfile: async (username) => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      const data = await getProfile(username);

      set({
        profile: data.user,

        followersCount: data.followersCount,
        followingCount: data.followingCount,

        isLoading: false,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to load profile.",
      });
    }
  },

  updateProfile: async (profileData) => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      const data = await updateProfile(profileData);

      set({
        profile: data.user,
        isLoading: false,
      });

      return {
        success: true,
      };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to update profile.";

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

  clearProfile: () =>
    set({
      profile: null,
      followersCount: 0,
      followingCount: 0,
    }),

  setFollowCounts: (followersCount, followingCount) =>
    set({
      followersCount,
      followingCount,
    }),

  incrementFollowers: () =>
    set((state) => ({
      followersCount: state.followersCount + 1,
    })),

  decrementFollowers: () =>
    set((state) => ({
      followersCount: Math.max(0, state.followersCount - 1),
    })),
}));

export default useProfileStore;
