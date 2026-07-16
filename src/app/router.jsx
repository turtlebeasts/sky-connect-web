import { createBrowserRouter, Navigate } from "react-router-dom";

import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";

import HomePage from "../features/posts/pages/HomePage";
import ProfilePage from "../features/profile/pages/ProfilePage";
import SearchPage from "../features/search/pages/SearchPage";

import MainLayout from "../components/layout/MainLayout";

import useAuthStore from "../features/auth/store/auth.store";
import MessagesPage from "../features/messages/pages/MessagesPage";

function ProtectedRoute({ children }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

const router = createBrowserRouter([
  {
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "profile/:username",
        element: <ProfilePage />,
      },
      {
        path: "messages",
        element: <MessagesPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

export default router;
