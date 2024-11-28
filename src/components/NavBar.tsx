import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/img/logo-sysaid.png';
import { FaRightFromBracket } from "react-icons/fa6";
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/auth/AuthContext';

const NavBar = () => {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()
    const handleLogout = () => {
        auth.signout();
        navigate('/login')
    }
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        // Verifica no localStorage se o usuário está autenticado e tem permissão de admin
        const userData = localStorage.getItem('user'); // Ou sessionStorage, caso use
        if (userData) {
            const user = JSON.parse(userData);
            setIsAdmin(user && user.admin); // Configura a permissão de admin a partir do localStorage
        }
    }, []);
  
    // const isAdmin = auth.user && auth.user.admin; 
    return (
        <>
            <div className="w-full h-20 bg-slate-300">
                <div className="w-full px-5 py-3 flex items-center justify-between max-w-7xl m-auto">
                    <img src={Logo} className="h-12" />
                    
                    <ul className="flex text-white flex-row gap-5 items-center justify-center">
                        { isAdmin && (
                        <Link className="text-slate-800 hover:text-amber-600 duration-200 font-bold" to="/user">Usuario</Link>
                        )}
                        { isAdmin && (
                        <Link className="text-slate-800 hover:text-amber-600 duration-200 font-bold" to="/group">Grupos</Link>
                        )}
                        { isAdmin && (
                        <Link className="text-slate-800 hover:text-amber-600 duration-200 font-bold" to="/ldap">LDAP</Link>
                        )}
                        <Link className="text-slate-800 hover:text-amber-600 duration-200 font-bold" to="/">Chamados</Link>
                        <button onClick={handleLogout} type="button"><FaRightFromBracket /></button>


                    </ul>
                </div>

            </div>
        </>
    )
}

export default NavBar