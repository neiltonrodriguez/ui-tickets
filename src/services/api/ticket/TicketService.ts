import { FilterState } from "../../../types";
import { Api } from "../Api";
import { ApiException } from "../ApiExceptions";

const getAllTicketsServed = async (offset: number = 1, limit: number = 10, filter: FilterState | null) => {
    try {
        // Construção dinâmica da query string com base nos filtros
        const params: { [key: string]: string | number } = { offset, limit };

        if (filter) {
            if (filter.request_user) params['request_user'] = filter.request_user;
            if (filter.responsability) params['responsability'] = filter.responsability;
            if (filter.problem_type) params['problem_type'] = filter.problem_type;
            if (filter.problem_sub_type) params['problem_sub_type'] = filter.problem_sub_type;
            if (filter.assigned_group) params['assigned_group'] = filter.assigned_group;
            if (filter.third_level_category) params['third_level_category'] = filter.third_level_category;
            if (filter.insert_time_start) params['insert_time_start'] = filter.insert_time_start;
            if (filter.insert_time_end) params['insert_time_end'] = filter.insert_time_end;
            // Adicione mais filtros conforme necessário...
        }
        const { data } = await Api.get(`/services/`, { params });
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Error ao logar na Api')
    }

};

const getAllTicketsRequest = async (offset: number = 1, limit: number = 10, filter: FilterState | null) => {
    try {
        // Construção dinâmica da query string com base nos filtros
        const params: { [key: string]: string | number } = { offset, limit };

        if (filter) {
            if (filter.request_user) params['request_user'] = filter.request_user;
            if (filter.responsability) params['responsability'] = filter.responsability;
            if (filter.problem_type) params['problem_type'] = filter.problem_type;
            if (filter.problem_sub_type) params['problem_sub_type'] = filter.problem_sub_type;
            if (filter.assigned_group) params['assigned_group'] = filter.assigned_group;
            if (filter.third_level_category) params['third_level_category'] = filter.third_level_category;
            if (filter.insert_time_start) params['insert_time_start'] = filter.insert_time_start;
            if (filter.insert_time_end) params['insert_time_end'] = filter.insert_time_end;
            // Adicione mais filtros conforme necessário...
        }
        const { data } = await Api.get('/services/myrequests/', { params });
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Error ao logar na Api')
    }

};

const getTicketByID = async (id: string) => {
    try {
        const { data } = await Api.get(`/services/${id}/`);
        return data;
    } catch (error: any) {
        return new ApiException(error.response.data.detail || 'Error ao logar na Api')
    }

};

const getRequestUser = async (search: string = '') => {
    try {
        const params: { [key: string]: string | number } = {};
        if (search) params['search'] = search;
        const { data } = await Api.get(`/lists/items/requestuser/`, { params });
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Error ao logar na Api')
    }

};

const getThirdCategory = async (endpoint: string, search: string = '') => {
        try {
            const params: { [key: string]: string | number } = {};
            if (search) {
                if (search) params['search'] = search;
            }
            const end = endpoint != '' ? `${endpoint}/` : '';
            const { data } = await Api.get(`/lists/items/thirdcategory/${end}`, { params });
            return data;
        } catch (error: any) {
            return new ApiException(error.message || 'Error ao logar na Api')
        }
    
    };

const getAssignedGroup = async (search: string = '') => {
    try {
        const params: { [key: string]: string | number } = {};
        if (search) params['search'] = search;
        const { data } = await Api.get(`/lists/items/group/`, { params });
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Error ao logar na Api')
    }

};

const getCategory = async (search: string = '') => {
    try {
        const params: { [key: string]: string | number } = {};
        if (search) params['search'] = search;
        const { data } = await Api.get(`/lists/items/category/`, {params});
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Error ao logar na Api')
    }

};

const getSubCategory = async (endpoint: string, search: string = '') => {
    try {
        const params: { [key: string]: string | number } = {};
        if (search) {
            if (search) params['search'] = search;
        }
        const end = endpoint != '' ? `${endpoint}/` : '';
        const { data } = await Api.get(`/lists/items/subcategory/${end}`, { params });
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Error ao logar na Api')
    }

};


const getAttendantUser = async (search: string = '') => {
    try {
        const params: { [key: string]: string | number } = {};
        if (search) {
            if (search) params['search'] = search;
        }
        const { data } = await Api.get(`/lists/items/attendantuser/`, {params});
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
    getAssignedGroup,
    getThirdCategory,
    getCategory,
    getSubCategory,
    getRequestUser,
    getAttendantUser,
    getFilesByTicketID,
    getLogsByTicketID,
    getAllTicketsServed,
    getAllTicketsRequest,
    getTicketByID
}