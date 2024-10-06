import { Users } from "../../../types";
import { Api } from "../Api";
import { ApiException } from "../ApiExceptions";

const getAllUser = async (offset: number = 1, limit: number = 10) => {
    try {

        const { data } = await Api.get('/users/',
            {
                params: {
                  offset,
                  limit
                }
              }
        );
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Error ao fazer getAll de User na Api')
    }

};

const getUserByID = async (id: string) => {
    try {

        const { data } = await Api.get('/users/' + id);
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Error ao fazer getById de User na Api')
    }

};

const updateUser = async (users: Users) => {
    try {

        const { data } = await Api.put(`/users/${users.id}`, users);
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Error ao fazer update de User na Api')
    }

};

const createUser = async (users: Users) => {
    try {

        const { data } = await Api.post('/users/', users);
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Error ao criar User na Api')
    }

};

const deleteUser = async (id: number) => {
    try {

        const { data } = await Api.delete(`/users/${id}`);
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Error ao deletar User na Api')
    }

};


export const UserService = {
    getAllUser,
    getUserByID,
    updateUser,
    createUser,
    deleteUser
}