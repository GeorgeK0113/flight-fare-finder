import { createBrowserRouter, Navigate } from "react-router-dom";

import ErrorPage from "./components/ErrorPage";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import RootLayout from "./components/RootLayout";
import AuthPage from "./pages/Auth";
import AppDashboard from "./pages/Dashboard";
import LandingPage from "./pages/Landing";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "auth", element: <AuthPage /> },
      // Dedicated sign-in / sign-up entry points, both served by the same
      // combined auth page (which already has a sign-in/sign-up tab switch).
      { path: "sign-in", element: <Navigate to="/auth" replace /> },
      { path: "sign-up", element: <Navigate to="/auth?mode=signup" replace /> },
      {
        path: "app",
        element: <ProtectedRoute />,
        children: [{ index: true, element: <AppDashboard /> }],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
