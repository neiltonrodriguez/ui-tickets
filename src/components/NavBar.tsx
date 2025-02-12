import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/img/logo-service-desk.png';
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
    const [ticketNumber, setTicketNumber] = useState('');
    useEffect(() => {
        // Verifica no localStorage se o usuário está autenticado e tem permissão de admin
        const userData = localStorage.getItem('user'); // Ou sessionStorage, caso use
        if (userData) {
            const user = JSON.parse(userData);
            setIsAdmin(user && user.admin); // Configura a permissão de admin a partir do localStorage
        }
    }, []);

    return (
        <>
            <div className="w-full h-20 bg-slate-300">
                <div className="w-full px-5 py-3 flex items-center justify-between max-w-7xl m-auto">
                    <img src={Logo} className="h-12" />

                    {/* Campo de entrada para o ticketNumber */}
                    <div>
                        <input
                            type="number"
                            className="rounded-md px-3 py-2 disabled:bg-gray-50 no-spinner"
                            placeholder="Digite o número do chamado"
                            value={ticketNumber}
                            onChange={(e) => setTicketNumber(e.target.value)}
                        />
                        <button
                            type='button'
                            className="bg-blue-700 rounded-md p-2 mx-2 text-white disabled:bg-gray-400"
                            disabled={!ticketNumber} 
                            onClick={() => {
                                if (!isNaN(Number(ticketNumber))) { // Verifica se ticketNumber não está vazio
                                    navigate(`/ticket/${ticketNumber}`);
                                } else {
                                    console.log("typeof", typeof(ticketNumber))
                                    alert("Por favor, digite um número de ticket."); 
                                }
                            }}
                        >
                            BUSCAR
                        </button>
                    </div>

                    <ul className="flex text-white flex-row gap-5 items-center justify-center">
                        {isAdmin && (
                            <Link className="text-slate-800 hover:text-amber-600 duration-200 font-bold" to="/user">Usuario</Link>
                        )}
                        {isAdmin && (
                            <Link className="text-slate-800 hover:text-amber-600 duration-200 font-bold" to="/group">Grupos</Link>
                        )}
                        {isAdmin && (
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