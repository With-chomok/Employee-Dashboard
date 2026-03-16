import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./Home.jsx";
import Layout from "./layout/Layout.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./pages/login/Login.jsx";

import Analytics from "./pages/analytics/Analytics.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import PrivateRoutes from "./routes/PrivateRoutes.jsx";
import Employees from "./pages/employees/Employees.jsx";
import Details from "./pages/details/Details.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <Login /> },
      {
        path: "/list",
        element: (
          <PrivateRoutes>
            <Employees />
          </PrivateRoutes>
        ),
      },
      { path: "/analytics", element: <Analytics /> },
      {
        path: "/details/:id" ,element: <Details/> 
      }
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
