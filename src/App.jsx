import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardPage from "./pages/admin/dashboard";
import UserPage from "./pages/admin/user";
import EventPage from "./pages/admin/event";
import OrderPage from "./pages/admin/order";
import AdminLayout from "./components/admin/layout.admin";
import HomePage from "./pages/client/home";
import EventDetailPage from "./pages/client/event";
import ClientLayout from "./components/client/layout.client";

function App() {
  const router = createBrowserRouter([
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          index: true,
          element: <DashboardPage />
        },
        {
          path: 'user',
          element: <UserPage />
        },
        {
          path: 'event',
          element: <EventPage />
        },
        {
          path: 'order',
          element: <OrderPage />
        }
      ]
    },
    {
      path: "/",
      element: <ClientLayout />,
      children: [
        {
          index: true,
          element: <HomePage />
        },
        {
          path: 'event',
          element: <EventDetailPage />
        }
      ]
    }

  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
