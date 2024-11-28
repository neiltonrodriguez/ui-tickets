import { Users } from "../../../types";
import { Api } from "../Api";
import { ApiException } from "../ApiExceptions";

const getAllUser = async (offset: number = 1, limit: number = 10, openModal: () => void, search: string = '') => {
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
    if (error.response?.data?.detail === "você não tem permissão para executar essa ação.") {
      openModal(); // Chama o modal
    }
    return new ApiException(error.message || 'Erro ao buscar todos os usuários');
  }
};

const getUserByID = async (id: string) => {
  try {
    const { data } = await Api.get(`/users/${id}`);
    return data;
  } catch (error: any) {
    return new ApiException(error.message || 'Erro ao buscar o usuário');
  }
};

const updateUser = async (users: Users) => {
  try {
    const { data } = await Api.put(`/users/${users.id}`, users);
    return data;
  } catch (error: any) {
    return new ApiException(error.message || 'Erro ao atualizar o usuário');
  }
};

const createUser = async (users: Users) => {
  try {
    const { data } = await Api.post('/users/', users);
    return data;
  } catch (error: any) {
    return new ApiException(error.message || 'Erro ao criar o usuário');
  }
};

const deleteUser = async (id: number, openModal: () => void) => {
  try {
    const { data } = await Api.delete(`/users/${id}`);
    return data;
  } catch (error: any) {
    if (error.response?.data?.detail === "você não tem permissão para executar essa ação.") {
      openModal(); // Chama o modal
    }
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
