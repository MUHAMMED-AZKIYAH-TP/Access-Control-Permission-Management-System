import { createBrowserRouter } from "react-router-dom";




import Protected_router from "./ProtectedRoute";
import Users from "../pages/Users";
import Roles from "../pages/Roles";
import AuditLogs from "../pages/AuditLogs";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Teams from "../pages/Teams";
import Permissions from "../pages/Permissions";
import RolePermissions from "../pages/RolePermissions";
import AssignRoleToUser from "../pages/AssignRoleToUser";
import AssignTeamToUser from "../pages/AssignTeamToUser";


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
                path: "/users",
                element: <Users />,
            },
            {
                path: "/roles",
                element: <Roles />,
            },
            {
                path: "/audit",
                element: <AuditLogs />,
            },

            {
                path: "/teams",
                element: <Teams />,
            },
            {
                path: "/permissions",
                element: <Permissions />,
            },
            {
                path: "/role-permissions",
                element: <RolePermissions />,
            },
            {
                path: "/assign-role-user",
                element: <AssignRoleToUser />,
            },
            {
                path: "/assign-team",
                element: <AssignTeamToUser />,
            },

        ],
    },

    {
        path: "/login",
        element: <Login />,
    },
]);
