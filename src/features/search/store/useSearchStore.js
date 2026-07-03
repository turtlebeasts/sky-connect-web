import { create } from "zustand";

import { searchUsers } from "../api/search.api";

const useSearchStore = create((set) => ({
  users: [],
  isLoading: false,
  error: null,
  hasSearched: false,

  searchUsers: async (query) => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      set({
        users: [],
        error: null,
        hasSearched: false,
      });

      return;
    }

    try {
      set({
        isLoading: true,
        error: null,
      });

      const data = await searchUsers(trimmedQuery);

      set({
        users: data.users,
        hasSearched: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        users: [],
        hasSearched: true,
        error: error.response?.data?.message || "Failed to search users.",
        isLoading: false,
      });
    }
  },

  clearResults: () => {
    set({
      users: [],
      error: null,
      hasSearched: false,
    });
  },

  clearError: () => {
    set({
      error: null,
    });
  },
}));

export default useSearchStore;
