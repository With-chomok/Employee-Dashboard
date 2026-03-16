import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./Home.jsx";
import Layout from "./layout/Layout.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./pages/login/Login.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import List from "./pages/list/List.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/list",
        Component: List
      },
      
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
