import { useEffect, useState } from 'react';
import { TicketService } from '../../services/api/ticket/TicketService';
import { User } from "../../types"


const Home = () => {
  const [user, setUser] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const usuarios = await TicketService.getAllTickets();
        console.log(usuarios)
        setUser(usuarios.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []);

  if (loading) return <p>Loading...</p>;
  return (
    <div className="container mx-auto">
      <p className="text-black text-4xl font-bold text-center mb-6">
        Usuários
      </p>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Nome</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Email</th>
            </tr>
          </thead>
          <tbody>
            {user.map((user: User) => (
              <tr key={user.email} className="border-t">
                <td className="text-left py-3 px-4">{user.nomecompleto}</td>
                <td className="text-left py-3 px-4">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  }
  
  export default Home