import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TicketService } from '../../services/api/ticket/TicketService';
import { Ticket } from '../../types';
import TicketForm from '../../components/TicketForm'; // Importando o UserForm
import { useNavigate } from 'react-router-dom';

const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  

  useEffect(() => {
    const getById = async () => {
      try {
        const result = await TicketService.getTicketByID(id as '');
        setTicket(result);
      } catch (err) {
        setError('Erro ao carregar os dados do usuário.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getById();

  }, [id]);



  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (

    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Detalhes do chamado</h1>
      {ticket && (
        <TicketForm ticketData={ticket}/>
      )}
    </div>
  );
};

export default UserDetails;