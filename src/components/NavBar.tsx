import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/img/logo-sysaid.png';
import { FaRightFromBracket } from "react-icons/fa6";
import { useContext } from 'react';
import { AuthContext } from '../context/auth/AuthContext';

const NavBar = () => {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()
    const handleLogout = () => {
        auth.signout();
        navigate('/login')
    }
    return (
        <>
            <div className="w-full h-20 bg-slate-300">
                <div className="w-full px-5 py-3 flex items-center justify-between max-w-7xl m-auto">
                    <img src={Logo} className="h-12" />
                    <ul className="flex text-white flex-row gap-5 items-center justify-center">
                        <Link className="text-slate-800 hover:text-amber-600 duration-200 font-bold" to="/">Dashboard</Link>
                        <Link className="text-slate-800 hover:text-amber-600 duration-200 font-bold" to="/user">Usuario</Link>
                        <Link className="text-slate-800 hover:text-amber-600 duration-200 font-bold" to="/ldap">LDAP</Link>
                        <Link className="text-slate-800 hover:text-amber-600 duration-200 font-bold" to="/tickets">Chamados</Link>
                        <button onClick={handleLogout} type="button"><FaRightFromBracket /></button>


                    </ul>
                </div>

            </div>
        </>
    )
}

export default NavBar