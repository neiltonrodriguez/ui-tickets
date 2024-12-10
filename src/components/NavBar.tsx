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
    const [ticketNumber, setTicketNumber] = useState('');
    useEffect(() => {
        // Verifica no localStorage se o usuário está autenticado e tem permissão de admin
        const userData = localStorage.getItem('user'); // Ou sessionStorage, caso use
        if (userData) {
            const user = JSON.parse(userData);
            setIsAdmin(user && user.admin); // Configura a permissão de admin a partir do localStorage
        }
    }, []);

    const handleTicketSubmit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && ticketNumber) {
            navigate(`/ticket/${ticketNumber}/served`)
            // Dispara a requisição com o ticketNumber
            // try {
            //     // Exemplo de requisição (substitua com a lógica de requisição desejada)
            //     const response = await fetch(`/api/tickets/${ticketNumber}`);
            //     const data = await response.json();
            //     console.log('Dados do ticket:', data);
            //     // Navegar para outra página ou realizar alguma outra ação com os dados recebidos
            //     navigate(`/ticket/${ticketNumber}`);
            // } catch (error) {
            //     console.error('Erro ao buscar ticket:', error);
            // }
        }
    };
  
    // const isAdmin = auth.user && auth.user.admin; 
    return (
        <>
            <div className="w-full h-20 bg-slate-300">
                <div className="w-full px-5 py-3 flex items-center justify-between max-w-7xl m-auto">
                    <img src={Logo} className="h-12" />

                     {/* Campo de entrada para o ticketNumber */}
                     <form>
                        <input 
                            type="text" 
                            className="rounded-md px-3 py-2" 
                            placeholder="Digite o número do chamado"
                            value={ticketNumber}
                            onChange={(e) => setTicketNumber(e.target.value)}
                            onKeyDown={handleTicketSubmit}  // Evento que captura o Enter
                        />
                    </form>
                    
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