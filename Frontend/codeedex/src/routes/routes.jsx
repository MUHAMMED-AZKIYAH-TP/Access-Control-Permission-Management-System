import { createBrowserRouter } from "react-router-dom";




import Protected_router from "./ProtectedRoute";
import Users from "../pages/Users";
import Roles from "../pages/Roles";
import AuditLogs from "../pages/AuditLogs";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected_router />,  
    children: [
      {
        index: true,
        element: <Home />,           
      },

      {
        path: "admin/users",
        element: <Users />,
      },
      {
        path: "admin/roles",
        element: <Roles />,
      },
      {
        path: "admin/audit",
        element: <AuditLogs />,
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
