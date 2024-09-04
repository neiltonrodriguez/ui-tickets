import { createBrowserRouter } from "react-router-dom"
import { Dashboard, Login } from "../pages/"
import { RequireAuth } from "../context/auth/RequireAuth";
import Home from "../pages/home/Home";

export const Rotas = createBrowserRouter([
    {
        path: "/",
        element: <RequireAuth><Dashboard /></RequireAuth>,
        children: [
            {
                path: "/",
                element: <RequireAuth><Home /></RequireAuth>,
            }
        ]
    },
    {
        path: "/login",
        element: <Login />
    }
]);