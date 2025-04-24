import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardPage from "./pages/Admin/dashboard";
import UserPage from "./pages/admin/user";
import EventPage from "./pages/Admin/event";
import OrderPage from "./pages/admin/order";
import AdminLayout from "./components/admin/layout.admin";

import ClientLayout from "./components/client/layout.client";
import HomePage from "./pages/client/Home/home";
import EventDetailPage from "./pages/client/Event/event";
import HistoryPage from "./pages/client/History/HistoryPage";
import ProfilePage from "./pages/client/Profile/ProfilePage";
import SearchResultPage from "./pages/client/Search/SearchResultPage";
import NotFoundError from "./pages/errors/404page";
import AboutUs from "./pages/client/About/AboutUs";
import BuyPage from "./pages/client/Buy/BuyPage";
import LoginPage from "./pages/auth/LoginPage";
import AuthLayout from "./components/auth/AuthLayout";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPageOne from "./pages/auth/ForgotPageOne";
import ForgotPageTwo from "./pages/auth/ForgotPageTwo";
import ProtectedRoute from "./components/share/protected-route";
import VerificationPage from "./pages/auth/VerificationPage";
import OAuth2Callback from "./components/auth/OAuth2Callback";

function App() {
  const router = createBrowserRouter([
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "user",
          element: (
            <ProtectedRoute>
              <UserPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "event",
          element: (
            <ProtectedRoute>
              <EventPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "order",
          element: (
            <ProtectedRoute>
              <OrderPage />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "register",
          element: <RegisterPage />,
        },
        {
          path: "verification",
          element: <VerificationPage />,
        },
        {
          path: "forgot-password",
          children: [
            {
              path: "step1",
              index: true,
              element: <ForgotPageOne />,
            },
            {
              path: "step2",
              element: <ForgotPageTwo />,
            },
          ],
        },
      ],
    },
    {
      path: "/",
      element: <ClientLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },

        {
          path: "event",
          element: <EventDetailPage />,
        },
        {
          path: "buy",
          element: <BuyPage />,
        },
        {
          path: "history",
          element: <HistoryPage />,
        },
        {
          path: "profile",
          element: <ProfilePage />,
        },
        {
          path: "search",
          element: <SearchResultPage />,
        },
        {
          path: "about-us",
          element: <AboutUs />,
        },
        {
          path: "*",
          element: <NotFoundError />,
        },
        {
          path: "/oauth2/callback",
          element: <OAuth2Callback />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
