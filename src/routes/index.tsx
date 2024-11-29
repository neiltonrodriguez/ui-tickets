import { createBrowserRouter } from "react-router-dom"
import { Dashboard, Login } from "../pages/"
import { RequireAuth } from "../context/auth/RequireAuth";
import Tickets from "../pages/ticket/Tickets";
import User from "../pages/user/User";
import Ldap from "../pages/ldap/Ldap";
import UserDetails from "../pages/user/UserDetails";
import LdapDetails from "../pages/ldap/LdapDetails";
import Group from "../pages/group/Group";
import GroupDetails from "../pages/group/GroupDetails";

export const Rotas = createBrowserRouter([
    {
        path: "/",
        element: <RequireAuth><Dashboard /></RequireAuth>,
        children: [
            {
                path: "/",
                element: <RequireAuth><Tickets /></RequireAuth>,
            },
            {
                path: "/user",
                element: <RequireAuth><User /></RequireAuth>,
            },
            {
                path: "/group",
                element: <RequireAuth><Group /></RequireAuth>,
            },
            {
                path: "/group/:name",
                element: <RequireAuth><GroupDetails /></RequireAuth>,
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