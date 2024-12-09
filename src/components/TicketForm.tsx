import React, { useEffect, useState } from 'react';
import { Log, Ticket, TicketFile } from '../types';
import { TicketService } from '../services/api/ticket/TicketService';
import { useNavigate } from 'react-router-dom';

type TicketFormProps = {
    ticketData: Ticket; // Permite que seja null quando criando um novo usuário
};

const TicketForm: React.FC<TicketFormProps> = ({ ticketData }) => {
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [ticketFiles, setTicketFiles] = useState<TicketFile[]>([]);
    // const [historys, setHistorys] = useState<Ticket[]>([]);
    const [logs, setLogs] = useState<Log[]>([]);
    // const [isAttendant, setIsAttendant] = useState(true)
    const [activeTab, setActiveTab] = useState('detalhes');
    const navigate = useNavigate();

    // useEffect(() => {
    //     const userData = localStorage.getItem('user');
    //     if (userData) {
    //         const user = JSON.parse(userData);
    //         setIsAttendant(user && user.attendant);
    //     }
    // }, []);

    const getFiles = async () => {
        try {
            if (ticket?.id) {
                const result = await TicketService.getFilesByTicketID(ticket.id);
                setTicketFiles(result.results);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const getLogs = async () => {
        try {
            if (ticket?.id) {
                const result = await TicketService.getLogsByTicketID(ticket.id);
                setLogs(result.results);
            }
        } catch (err) {
            console.error(err);
        }
    };

    // const getHistorys = async () => {
    //     try {
    //         if (ticket?.id) {
    //             const result = await TicketService.getHistoryByTicketID(ticket.id);
    //             setHistorys(result.results);
    //         }
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };


    useEffect(() => {
        if (ticketData) {
            setTicket(ticketData);
        }
    }, [ticketData]);

    useEffect(() => {
        if (activeTab === 'arquivos') {
            getFiles();
        }
        if (activeTab === 'logs') {
            getLogs();
        }

        // if (activeTab === 'historico') {
        //     getHistorys();
        // }
    }, [activeTab]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        console.log(e.target);

    };

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <>
            <div className="border-b-slate-300 border-b-2 flex gap-2 mb-4">
                <button
                    onClick={() => handleTabChange('detalhes')}
                    className={`px-4 py-2 ${activeTab === 'detalhes' ? 'bg-slate-400' : ''}`}>
                    Detalhes
                </button>
                <button
                    onClick={() => handleTabChange('arquivos')}
                    className={`px-4 py-2 ${activeTab === 'arquivos' ? 'bg-slate-400' : ''}`}>
                    Arquivos
                </button>
                <button
                    onClick={() => handleTabChange('logs')}
                    className={`px-4 py-2 ${activeTab === 'logs' ? 'bg-slate-400' : ''}`}>
                    Logs
                </button>
                {/* <button
                    onClick={() => handleTabChange('historico')}
                    className={`px-4 py-2 ${activeTab === 'historico' ? 'bg-slate-400' : ''}`}>
                    Histórico
                </button> */}

            </div>
            {activeTab === 'detalhes' && (
                <div>
                    <div className="space-y-4 border p-3 rounded-lg">
                        <h3 className='font-bold text-lg'>Dados do solicitante</h3>
                        <div className="grid grid-cols-4 gap-4 ">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Código</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={ticket?.id}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Hora da solicitação</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={ticket?.insert_time}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Aberto por</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={ticket?.submit_user}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Usuário solicitante</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={ticket?.request_user}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Título</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={ticket?.title}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Descrição</label>
                                <textarea
                                    name="description"
                                    value={ticket?.description}

                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    rows={3}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Urgência</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={ticket?.urgency}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Impacto</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={ticket?.impact}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Prioridade</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={ticket?.priority}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                    </div>

                    <div className="border p-3 rounded-lg mt-3">
                        <h3 className='font-bold text-lg'>Dados da Solicitação</h3>
                        <div className="grid grid-cols-3 gap-4 mt-3 p-3">

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Categoria</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={ticket?.problem_type}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Sub categoria</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={ticket?.problem_sub_type}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Terceira categoria</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={ticket?.third_level_category}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Hora de encerramento</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={ticket?.close_time ?? ""}
                                    onChange={handleChange}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Última atualização</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={ticket?.update_time}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Usuário atualização</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={ticket?.update_user}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Status</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={ticket?.status}
                                    onChange={handleChange}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Sub categoria</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={ticket?.assigned_group}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Atendente</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={ticket?.submit_user}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Tempo de atendimento</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={ticket?.timer1}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Tempo de resposta</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={ticket?.timer2}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Tempo corrido</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={ticket?.timer3}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Tempo de encerrado</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={ticket?.timer4 ?? ""}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Tempo Pausado</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={ticket?.timer6 ?? ""}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="border p-3 rounded-lg mt-3">
                        <h3 className='font-bold text-lg'>Dados da Solicitação</h3>
                        <div className="grid grid-cols-3 gap-4 mt-3 p-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Notas</label>
                                <textarea
                                    name="notes"
                                    value={ticket?.notes}

                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    rows={3}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Causa raiz</label>
                                <textarea
                                    name="resolution"
                                    value={ticket?.resolution}

                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    rows={3}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Solução</label>
                                <textarea
                                    name="solution"
                                    value={ticket?.solution}

                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    rows={3}
                                />
                            </div>
                        </div>
                        {ticket?.sr_sub_type != 19 && (
                            <div className="grid grid-cols-3 gap-4 mt-3 p-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Divulgação da vaga</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={ticket?.sr_cust_divulgacao_vaga}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Triagem dos currículos</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={ticket?.sr_cust_tria_curriculos}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Entrevistas RH</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={ticket?.sr_cust_entrevista_rh}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Entrevistas Gestor</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={ticket?.sr_cust_entrevista_gest}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Envio de documentação</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={ticket?.sr_cust_envio_doc}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Entrega de documentação</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={ticket?.sr_cust_entrega_doc}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Solicitação de computador</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={ticket?.sr_cust_solicita_comput}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Solicitação de e-mail</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={ticket?.sr_cust_solicita_email}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Solicitação de login</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={ticket?.sr_cust_solicita_login}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Cadastro de ponto</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={ticket?.sr_cust_cadastro_ponto}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Treinamento de boas vindas</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={ticket?.sr_cust_treino_welcome}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => navigate(`/`)}
                            className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Voltar
                        </button>
                    </div>
                </div>
            )}
            {activeTab === 'arquivos' && (
                <table className="min-w-full bg-white border border-gray-200 table-auto">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="text-left px-2 uppercase font-semibold text-sm">Nome do arquivo</th>
                            <th className="text-left px-2 uppercase font-semibold text-sm">Link para download</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ticketFiles.map((t: TicketFile) => (
                            <tr key={t.download_link} className="border-t hover:bg-gray-50 cursor-pointer">
                                <td className="text-left px-2 text-sm"><a href={t.download_link} download>{t.real_file_name}</a></td>
                                <td className="text-left px-2 text-sm"><a href={t.download_link} download>{t.download_link}</a></td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {activeTab === 'logs' && (
                <table className="min-w-full bg-white border border-gray-200 table-auto">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="text-left px-2 uppercase font-semibold text-sm">#</th>
                            <th className="text-left px-2 uppercase font-semibold text-sm">Data</th>
                            <th className="text-left px-2 uppercase font-semibold text-sm">Usuário</th>
                            <th className="text-left px-2 uppercase font-semibold text-sm">Tipo</th>
                            <th className="text-left px-2 uppercase font-semibold text-sm">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map((t: Log) => (
                            <tr key={t.log_id} className="border-t hover:bg-gray-50 cursor-pointer">
                                <td className="text-left px-2 text-sm">{t.log_id}</td>
                                <td className="text-left px-2 text-sm">{t.log_time}</td>
                                <td className="text-left px-2 text-sm">{t.user_name}</td>
                                <td className="text-left px-2 text-sm">{t.log_type}</td>
                                <td className="text-left px-2 text-sm">{t.log_description}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* {activeTab === 'historico' && (
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
                  {historys.map((t: Ticket) => (
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
            )} */}
        </>


    );
};

export default TicketForm;
