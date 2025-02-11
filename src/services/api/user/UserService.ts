import { Users } from "../../../types";
import { Api } from "../Api";
import { ApiException } from "../ApiExceptions";

const getAllUser = async (offset: number = 1, limit: number = 10, search: string = '') => {
  try {
    const { data } = await Api.get('/users/', {
      params: {
        offset,
        limit,
        search
      },
    });
    return data;
  } catch (error: any) {
    alert(error.response?.data?.detail || error.message || 'Erro ao listar usuários')
    return new ApiException(error.message || 'Erro ao buscar todos os usuários');
  }
};

const getUserByID = async (id: string) => {
  try {
    const { data } = await Api.get(`/users/${id}`);
    return data;
  } catch (error: any) {
    alert(error.response?.data?.detail || error.message || 'Erro ao carregar usuário')
    return new ApiException(error.message || 'Erro ao buscar o usuário');
  }
};

const updateUser = async (users: Users) => {
  try {
    const { id, username, complete_user_name, ...userWithoutId } = users;
    const { data } = await Api.put(`/users/${users.id}/`, userWithoutId);
    return data;
  } catch (error: any) {
    alert(error.response?.data?.detail[0]?.source || 'Erro ao atualizar o usuário')
    return new ApiException(error.response?.data?.detail || error.message || 'Erro ao atualizar o usuário');
  }
};

const createUser = async (users: Users) => {
  try {
    const { data } = await Api.post('/users/', users);
    return data;
  } catch (error: any) {
    alert(error.response?.data?.detail || error.message || 'Erro ao criar usuário')
    return new ApiException(error.message || 'Erro ao criar o usuário');
  }
};

const deleteUser = async (id: number) => {
  try {
    const { data } = await Api.delete(`/users/${id}`);
    return data;
  } catch (error: any) {
    alert(error.response?.data?.detail || error.message || 'Erro ao deletar usuário')
    return new ApiException(error.message || 'Erro ao deletar o usuário');
  }
};



export const UserService = {
  getAllUser,
  getUserByID,
  updateUser,
  createUser,
  deleteUser,
};
