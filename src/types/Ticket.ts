export type Ticket = {
    id: number;
    code: number;
    status: boolean;
    hora_solicitacao: string;
    aberto_por: string;
    categoria: string;
    sub_categoria: string;
    titulo: string;
    usuario_solicitante: string;
    administrador_do_grupo: string;
    atendente: string;
    prioridade: string;
    data_para_conclusao: string;
    tempo_de_atendimento: string;
}