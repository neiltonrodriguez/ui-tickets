import { useEffect, useState } from 'react';
import { TicketService } from '../../services/api/ticket/TicketService';
import { Ticket } from "../../types"


const Home = () => {
  const [ticket, setTicket] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const result = await TicketService.getAllTickets();
        console.log(result)
        setTicket(result as Ticket[]);
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
      </p>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Code</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Título</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Categoria</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Status</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Prioridade</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Data para conclusão</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Atendente</th>
            </tr>
          </thead>
          <tbody>
            {ticket.map((t: Ticket) => (
              <tr key={t.code} className="border-t">
                <td className="text-left py-3 px-4">{t.code}</td>
                <td className="text-left py-3 px-4">{t.titulo}</td>
                <td className="text-left py-3 px-4">{t.categoria}</td>
                <td className="text-left py-3 px-4">{t.status ? 'ativo' : 'inativo'}</td>
                <td className="text-left py-3 px-4">{t.prioridade}</td>
                <td className="text-left py-3 px-4">{t.data_para_conclusao}</td>
                <td className="text-left py-3 px-4">{t.atendente}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  }
  
  export default Home