// import { Api } from "../Api";
import { Ticket } from "../../../types";
import { ApiException } from "../ApiExceptions";

const getAllTickets = async () => {
    try {
        const data: Ticket[] = [
                    {
                        "id": 1,
                        "code": 223,
                        "status": true,
                        "hora_solicitacao": "2019-07-01T14:00:00",
                        "aberto_por": "João da Silva",
                        "categoria": "Manutenção",
                        "sub_categoria": "Elétrica",
                        "titulo": "Lâmpada queimada",
                        "usuario_solicitante": "Maria da Silva",
                        "administrador_do_grupo": "José da Silva",
                        "atendente": "José da Silva",
                        "prioridade": "Alta",
                        "data_para_conclusao": "2019-07-01T14:00:00",
                        "tempo_de_atendimento": "00:00:00"
                    }
                ];

        // Simular um atraso na resposta para imitar uma API real
        await new Promise(resolve => setTimeout(resolve, 500)); // 500ms de atraso
        // const { data } = await Api.get('/usuarios/');
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Error ao logar na Api')
    }

};


export const TicketService = {
    getAllTickets,
}