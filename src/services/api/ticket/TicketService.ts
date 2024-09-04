import { Api } from "../Api";
import { ApiException } from "../ApiExceptions";

const getAllTickets = async () => {
    try {
        const { data } = await Api.get('/usuarios/');
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Error ao logar na Api')
    }

};


export const TicketService = {
    getAllTickets,
}