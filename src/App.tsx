import { Link, useNavigate } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "./context/auth/AuthContext";

export const App = () => {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()
  const handleLogout = async () => {
    await auth.signout();
    navigate('/app-band/login')
  }
  return (
    <div className="App">
      <div className="">
        <ul className="flex gap-5 items-center justify-center">
          <li>
            <Link className="hover:text-blue-500" to="/app-band">Dashboard</Link>
          </li>
          <li>
            <Link className="hover:text-blue-500" to="/app-band/grupos">Grupos</Link>
          </li>
          <li>
            {auth.user && <a onClick={handleLogout} className="hover:text-blue-500 cursor-pointer">sair</a>}
          </li>
        </ul>
        <div className="flex items-center justify-center">
        <p>Seja bem vindor Sr(a): {auth.user?.first_name}</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
