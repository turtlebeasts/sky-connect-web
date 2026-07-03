import { create } from "zustand";
import { persist } from "zustand/middleware";
import { login, register, getMe } from "../api/auth.api";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials) => {
        try {
          set({ isLoading: true, error: null });

          const data = await login(credentials);

          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            isLoading: false,
          });

          return { success: true };
        } catch (error) {
          const message =
            error.response?.data?.message || "Something went wrong";

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

      register: async (userData) => {
        try {
          set({ isLoading: true, error: null });

          const data = await register(userData);

          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            isLoading: false,
          });

          return { success: true };
        } catch (error) {
          const message =
            error.response?.data?.message || "Something went wrong";

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

      fetchMe: async () => {
        try {
          const data = await getMe();

          set({
            user: data.user,
            isAuthenticated: true,
          });
        } catch {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
          });
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

export default useAuthStore;
