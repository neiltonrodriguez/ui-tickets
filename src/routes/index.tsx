import { createBrowserRouter } from "react-router-dom"
import { Dashboard, Login } from "../pages/"
import { RequireAuth } from "../context/auth/RequireAuth";
import Home from "../pages/home/Home";
import Tickets from "../pages/ticket/Tickets";
import User from "../pages/user/User";
import Ldap from "../pages/ldap/Ldap";

export const Rotas = createBrowserRouter([
    {
        path: "/",
        element: <RequireAuth><Dashboard /></RequireAuth>,
        children: [
            {
                path: "/",
                element: <RequireAuth><Home /></RequireAuth>,
            },
            {
                path: "/tickets",
                element: <RequireAuth><Tickets /></RequireAuth>,
            },
            {
                path: "/user",
                element: <RequireAuth><User /></RequireAuth>,
            },
            {
                path: "/ldap",
                element: <RequireAuth><Ldap /></RequireAuth>,
            }
        ]
    },
    {
        path: "/login",
        element: <Login />
    }
]);