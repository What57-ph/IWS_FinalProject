import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardPage from "./pages/admin/dashboard";
import UserPage from "./pages/admin/user";
import EventPage from "./pages/admin/event";
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

function App() {
  const router = createBrowserRouter([
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          index: true,
          element: <DashboardPage />,
        },
        {
          path: "user",
          element: <UserPage />,
        },
        {
          path: "event",
          element: <EventPage />,
        },
        {
          path: "order",
          element: <OrderPage />,
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
