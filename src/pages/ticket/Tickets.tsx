import { useEffect, useState } from 'react';
import { TicketService } from '../../services/api/ticket/TicketService';
import { Ticket } from "../../types"
// import FilterComponent from "../../components/FilterComponent";


const Tickets = () => {
  // const [filteredData, setFilteredData] = useState([]);
  const [activeTab, setActiveTab] = useState('solicitados');
  const [isAttendant, setAttendant] = useState(true);
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setAttendant(user && user.attendant);
    }
  }, []);

  // const handleFilter = (filters: any) => {
  //     console.log(filters);  // Aqui você pode aplicar os filtros aos seus dados
  //     // setFilteredData(filters);
  // };
  const [ticket, setTicket] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAttendant) {
      setActiveTab('solicitados')
    } else {
      setActiveTab('atendidos')
    }
  }, [isAttendant]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const result = await TicketService.getAllTickets();
        setTicket(result as Ticket[]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  if (loading) return <p>Loading...</p>;
  return (
    <div className="container mx-auto">
      {/* <FilterComponent onFilter={handleFilter} /> */}
      <p className="text-black text-4xl font-bold text-center mb-6">
      </p>
      <div className="border-b-slate-300 border-b-2 flex gap-2 mb-4">
        {isAttendant && (<button
          onClick={() => handleTabChange('atendidos')}
          className={`px-4 py-2 ${activeTab === 'atendidos' ? 'bg-slate-400' : ''}`}>
          Chamados atendidos
        </button>)}
        <button
          onClick={() => handleTabChange('solicitados')}
          className={`px-4 py-2 ${activeTab === 'solicitados' ? 'bg-slate-400' : ''}`}>
          Chamados que solicitei
        </button>

      </div>
      {activeTab === 'atendidos' && isAttendant && (
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
                <tr key={t.id} className="border-t">
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
      )}
      {activeTab === 'solicitados' && (
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
                <tr key={t.id} className="border-t">
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
      )}
    </div>
  );
}

export default Tickets