import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TicketService } from '../../services/api/ticket/TicketService';
import { Ticket } from '../../types';
import TicketForm from '../../components/TicketForm'; // Importando o UserForm

const UserDetails = () => {
    const { id, tipo } = useParams<{ id: string, tipo: string }>();
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);



    const getByIdServed = async () => {
        try {
            const result = await TicketService.getTicketByIDServed(id as '');
            setTicket(result);
        } catch (err) {
            setError('Erro ao carregar os dados do usuário.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const getByIdRequest = async () => {
        try {
            const result = await TicketService.getTicketByIDRequest(id as '');
            setTicket(result);
        } catch (err) {
            setError('Erro ao carregar os dados do usuário.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if(tipo == 'served'){
            getByIdServed();
        } else {
            getByIdRequest();
        }

    }, [id]);



    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (

        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Detalhes do chamado</h1>
            {ticket && (
                <TicketForm ticketData={ticket} />
            )}
        </div>
    );
};

export default UserDetails;