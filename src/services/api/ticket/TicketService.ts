import { Api } from "../Api";
import { ApiException } from "../ApiExceptions";

const getAllTicketsServed = async (offset: number = 1, limit: number = 10, search: string = '') => {
    try {
        const { data } = await Api.get('/services/list/served',{
            params: {
                offset,
                limit,
                search
              },
            }
        );
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Error ao logar na Api')
    }

};

const getAllTicketsRequest = async (offset: number = 1, limit: number = 10, search: string = '') => {
    try {
        const { data } = await Api.get('/services/list/myrequests/',{
            params: {
                offset,
                limit,
                search
              },
            }
        );
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Error ao logar na Api')
    }

};

const getTicketByIDServed = async (id: string) => {
    try {
        const { data } = await Api.get(`/services/item/served/${id}/`);
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Error ao logar na Api')
    }

};

const getTicketByIDRequest = async (id: string) => {
    try {
        const { data } = await Api.get(`/services/item/myrequest/${id}/`);
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Error ao logar na Api')
    }

};

const getFilesByTicketID = async (id: number) => {
    try {
        const { data } = await Api.get(`/services/${id}/files`);
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Error ao logar na Api')
    }

};

const getLogsByTicketID = async (id: number) => {
    try {
        const { data } = await Api.get(`/services/${id}/logs`);
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Error ao logar na Api')
    }

};

const getHistoryByTicketID = async (id: number) => {
    try {
        const { data } = await Api.get(`/services/${id}/history`);
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Error ao logar na Api')
    }

};


export const TicketService = {
    getHistoryByTicketID,
    getFilesByTicketID,
    getLogsByTicketID,
    getAllTicketsServed,
    getAllTicketsRequest,
    getTicketByIDServed,
    getTicketByIDRequest
}