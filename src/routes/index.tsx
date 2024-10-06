import { createBrowserRouter } from "react-router-dom"
import { Dashboard, Login } from "../pages/"
import { RequireAuth } from "../context/auth/RequireAuth";
import Home from "../pages/home/Home";
import Tickets from "../pages/ticket/Tickets";
import User from "../pages/user/User";
import Ldap from "../pages/ldap/Ldap";
import UserDetails from "../pages/user/UserDetails";
import LdapDetails from "../pages/ldap/LdapDetails";

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
                path: "/user/:id/:mode",
                element: <RequireAuth><UserDetails /></RequireAuth>,
            },
            {
                path: "/ldap",
                element: <RequireAuth><Ldap /></RequireAuth>,
            },
            {
                path: "/ldap/:id/:mode",
                element: <RequireAuth><LdapDetails /></RequireAuth>,
            },
        ]
    },
    {
        path: "/login",
        element: <Login />
    }
]);