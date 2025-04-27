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
import NotFoundPage from "./pages/errors/404page";

import PaymentSuccess from "./pages/client/Buy/PaymentSuccess";
import PaymentFail from "./pages/client/Buy/PaymentFail";
import OrganizerPage from "./pages/Admin/organizer";

function App() {
  const router = createBrowserRouter([
    {
      path: "/admin",
      element: (
        <ProtectedRoute requireAdmin>
          <AdminLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <DashboardPage />
        },
        {
          path: "user",
          element: <UserPage />
        },
        {
          path: "organizer",
          element: (
            <ProtectedRoute>
              <OrganizerPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "event",
          element: <EventPage />
        },
        {
          path: "order",
          element: <OrderPage />
        }
      ]
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
          element: (<ProtectedRoute requireAuth> <BuyPage /> </ProtectedRoute>),
        },
        {
          path: "history",
          element: (<ProtectedRoute requireAuth><HistoryPage /></ProtectedRoute>),
        },
        {
          path: "profile",
          element: (<ProtectedRoute requireAuth><ProfilePage /> </ProtectedRoute>),
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
          path: "payment",
          children: [
            {
              path: "success",
              element: <PaymentSuccess />
            },
            {
              path: "failed",
              element: <PaymentFail />
            }
          ]
        },
        {
          path: "/oauth2/callback",
          element: <OAuth2Callback />,
        },
        {
          path: "*",
          element: <NotFoundPage />,
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