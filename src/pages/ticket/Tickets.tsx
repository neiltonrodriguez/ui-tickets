import { useEffect, useState } from 'react';
import { TicketService } from '../../services/api/ticket/TicketService';
import { Ticket } from "../../types"
import { useNavigate } from 'react-router-dom';
// import FilterComponent from "../../components/FilterComponent";


const Tickets = () => {
  // const [filteredData, setFilteredData] = useState([]);
  const [activeTab, setActiveTab] = useState('solicitados');
  const [isAttendant, setAttendant] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [ticketsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [pageRange, setPageRange] = useState([1, 5]);
  const navigate = useNavigate();

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
  const [myTicket, setMyTicket] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAttendant) {
      setActiveTab('solicitados')
    } else {
      setActiveTab('atendidos')
    }
  }, [isAttendant]);


  const getTickets = async () => {
    try {
      const offset = (currentPage - 1) * ticketsPerPage; 
      const result = await TicketService.getAllTickets(offset, ticketsPerPage, search);
      setTicket(result.results as Ticket[]);
      setTotal(result.count);
      const totalPages = Math.ceil(result.count / ticketsPerPage);

      const newRangeStart = Math.floor((currentPage - 1) / 5) * 5 + 1;
      const newRangeEnd = Math.min(newRangeStart + 4, totalPages);
      setPageRange([newRangeStart, newRangeEnd]);

      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        const myTickets = result.results.filter((t: Ticket) => t.request_user === user.username);
        setMyTicket(myTickets); 
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTickets();
  }, [currentPage, ticketsPerPage]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const updatePageRange = (newPage: number) => {
    setCurrentPage(newPage);

    const newRangeStart = Math.floor((newPage - 1) / 5) * 5 + 1;
    const newRangeEnd = Math.min(newRangeStart + 4, Math.ceil(total / ticketsPerPage));

    setPageRange([newRangeStart, newRangeEnd]);
  };
  const totalPages = Math.ceil(total / ticketsPerPage);

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
        <div className="overflow-x-auto ">
          <table className="min-w-full bg-white border border-gray-200 table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left px-2 uppercase font-semibold text-sm">ID</th>
                {isAttendant && (<th className="text-left px-2 uppercase font-semibold text-sm">Solicitante</th>)}
                <th className="text-left px-2 uppercase font-semibold text-sm">Título</th>
                {isAttendant && (<th className="text-left px-2 uppercase font-semibold text-sm">Categoria</th>)}
                {isAttendant && (<th className="text-left px-2 uppercase font-semibold text-sm">Sub Categoria</th>)}
                {isAttendant && (<th className="text-left px-2 uppercase font-semibold text-sm">Terceira Categoria</th>)}
                <th className="text-left px-2 uppercase font-semibold text-sm">Grupo de atendimento</th>
                <th className="text-left px-2 uppercase font-semibold text-sm">Status</th>
                <th className="text-left px-2 uppercase font-semibold text-sm">Hora da solicitação</th>
                <th className="text-left px-2 uppercase font-semibold text-sm">Hora de encerramento</th>
              </tr>
            </thead>
            <tbody>
              {ticket.map((t: Ticket) => (
                <tr key={t.id} className="border-t hover:bg-gray-50 cursor-pointer">
                  <td onClick={() => navigate(`/ticket/${t.id}/`)} className="text-left px-2 text-sm">{t.id}</td>
                  {isAttendant && (<td onClick={() => navigate(`/ticket/${t.id}/`)}  className="text-left px-2 text-sm">{t.request_user}</td>)}
                  <td className="text-left px-2 text-sm">{t.title.substring(0, 10)}..</td>
                  {isAttendant && (<td onClick={() => navigate(`/ticket/${t.id}/`)}  className="text-left px-2 text-sm">{t.problem_type}</td>)}
                  {isAttendant && (<td onClick={() => navigate(`/ticket/${t.id}/`)}  className="text-left px-2 text-sm">{t.problem_sub_type}</td>)}
                  {isAttendant && (<td onClick={() => navigate(`/ticket/${t.id}/`)}  className="text-left px-2 text-sm">{t.third_level_category}</td>)}
                  <td onClick={() => navigate(`/ticket/${t.id}/`)}  className="text-left px-2 text-sm">{t.responsibility}</td>
                  <td onClick={() => navigate(`/ticket/${t.id}/`)}  className="text-left px-2 text-sm">{t.status ? 'ativo' : 'inativo'}</td>

                  <td onClick={() => navigate(`/ticket/${t.id}/`)}  className="text-left px-2 text-sm">{t.insert_time}</td>
                  <td onClick={() => navigate(`/ticket/${t.id}/`)}  className="text-left px-2 text-sm">{t.close_time}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
              <button
                onClick={() => updatePageRange(currentPage - 1)}
                disabled={currentPage === 1}
                className="mx-1 px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
              >
                Anterior
              </button>

              {Array.from({ length: pageRange[1] - pageRange[0] + 1 }, (_, index) => (
                <button
                  key={pageRange[0] + index}
                  onClick={() => updatePageRange(pageRange[0] + index)}
                  className={`mx-1 px-3 py-1 rounded ${currentPage === pageRange[0] + index ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                  {pageRange[0] + index}
                </button>
              ))}

              <button
                onClick={() => updatePageRange(currentPage + 1)}
                disabled={currentPage === Math.ceil(total / ticketsPerPage)}
                className="mx-1 px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
              >
                Próximo
              </button>
            </div>

        </div>
      )}
      {activeTab === 'solicitados' && (
        <div className="overflow-x-auto ">
          <table className="min-w-full bg-white border border-gray-200 table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left px-2 uppercase font-semibold text-sm">ID</th>
                {isAttendant && (<th className="text-left px-2 uppercase font-semibold text-sm">Solicitante</th>)}
                <th className="text-left px-2 uppercase font-semibold text-sm">Título</th>
                {isAttendant && (<th className="text-left px-2 uppercase font-semibold text-sm">Categoria</th>)}
                {isAttendant && (<th className="text-left px-2 uppercase font-semibold text-sm">Sub Categoria</th>)}
                {isAttendant && (<th className="text-left px-2 uppercase font-semibold text-sm">Terceira Categoria</th>)}
                <th className="text-left px-2 uppercase font-semibold text-sm">Grupo de atendimento</th>
                <th className="text-left px-2 uppercase font-semibold text-sm">Status</th>
                <th className="text-left px-2 uppercase font-semibold text-sm">Hora da solicitação</th>
                <th className="text-left px-2 uppercase font-semibold text-sm">Hora de encerramento</th>
              </tr>
            </thead>
            <tbody>
              {myTicket.map((t: Ticket) => (
                <tr key={t.id} className="border-t">
                  <td onClick={() => navigate(`/ticket/${t.id}/`)} className="text-left px-2 text-sm">{t.id}</td>
                  {isAttendant && (<td className="text-left px-2 text-sm">{t.request_user}</td>)}
                  <td className="text-left px-2 text-sm">{t.title.substring(0, 10)}..</td>
                  {isAttendant && (<td className="text-left px-2 text-sm">{t.problem_type}</td>)}
                  {isAttendant && (<td className="text-left px-2 text-sm">{t.problem_sub_type}</td>)}
                  {isAttendant && (<td className="text-left px-2 text-sm">{t.third_level_category}</td>)}
                  <td className="text-left px-2 text-sm">{t.responsibility}</td>
                  <td className="text-left px-2 text-sm">{t.status ? 'ativo' : 'inativo'}</td>

                  <td className="text-left px-2 text-sm">{t.insert_time}</td>
                  <td className="text-left px-2 text-sm">{t.close_time}</td>
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