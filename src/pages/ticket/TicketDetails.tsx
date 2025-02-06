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
    const [historys, setHistorys] = useState<Ticket[]>([]);



    const getByIdServed = async () => {
        try {
            setLoading(true);
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
            setLoading(true);
            const result = await TicketService.getTicketByIDRequest(id as '');
            setTicket(result);
        } catch (err) {
            setError('Erro ao carregar os dados do usuário.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const getHistorys = async () => {
        try {
            if (ticket?.id) {
                const result = await TicketService.getHistoryByTicketID(ticket.id);
                setHistorys(result.results);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const switchTicket = () => {
        if (tipo === 'served') {
            getByIdServed();

        } else if (tipo === 'request') {
            getByIdRequest();

        } else if (tipo === undefined) {
            getByIdRequest();
            getByIdServed();

        }
    };

    useEffect(() => {
        switchTicket();
    }, [id, tipo]);

    useEffect(() => {
        if (ticket?.id) {
            getHistorys();
        }
    }, [ticket]);

    const handleHistoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const versionId = Number(event.target.value);

        const tick = historys.find(h => h.version === versionId);
        setTicket(tick as Ticket);
    };


    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (

        <div className="container mx-auto p-3">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold mb-4">Detalhes do chamado</h1>
                <div className="flex items-center justify-center gap-3">
                    <label htmlFor="options" className="block text-sm font-medium text-gray-700">
                        Histórico
                    </label>
                    <select
                        onChange={handleHistoryChange}
                        id="options"
                        name="options"
                        className="border-2 px-2 block w-full rounded-md border-gray-300 shadow-sm "
                    >
                        {historys.map((t: Ticket) =>
                            <option key={t.version} value={t.version}>Versão {t.version}</option>
                        )};

                    </select>
                </div>
                
            </div>

            {ticket && (
                <TicketForm ticketData={ticket} />
            )}
        </div>
    );
};

export default UserDetails;