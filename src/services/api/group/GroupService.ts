import { UserForGroup } from "../../../types";
import { Api } from "../Api";
import { ApiException } from "../ApiExceptions";

const getAllGroup = async (offset: number = 1, limit: number = 10, search: string = '') => {
    try {
        const { data } = await Api.get('/usergroups/', {
            params: {
                offset,
                limit,
                search  // Passa o termo de pesquisa para a API
            }
        });
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Error ao fazer getAll de Group na Api');
    }
};

const getGroupByID = async (id: string) => {
    try {

        const { data } = await Api.get('/usergroups/' + id);
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Error ao fazer getById de User na Api')
    }

};
const getGroupByName = async (name: string) => {
    try {

        const { data } = await Api.get('/usergroups?group_name=' + name);
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Error ao fazer getById de User na Api')
    }

};

const getGroupOfUser = async (user: string) => {
    try {

        const { data } = await Api.get('/usergroups/' + user + '/groupsofuser');
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Error ao fazer getById de GroupOfUser na Api')
    }

};

const getGroupsForUser = async (name: string) => {
    try {

        const { data } = await Api.get(`/usergroups/${name}/availablegroups`);
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Error ao deletar User na Api')
    }

};

const getUserInGroup = async (name: string) => {
    try {
        console.log(name)

        const { data } = await Api.get(`/usergroups/${name}/usersingroup`);
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Error ao buscar User neste grupo')
    }

};

const insertUserForGroup = async (name: string, user: UserForGroup) => {
    try {

        const { data } = await Api.post(`/usergroups/${name}/usertogroup`, user);
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Error ao deletar User na Api')
    }

};

const deleteUserForGroup = async (nameGroup: string, nameUser: string) => {
    try {

        const { data } = await Api.delete(`/usergroups/${nameGroup}/usertogroup/${nameUser}`);
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Error ao deletar User na Api')
    }

};

export const GroupService = {
    getGroupByName,
    getAllGroup,
    getGroupByID,
    getGroupsForUser,
    insertUserForGroup,
    deleteUserForGroup,
    getGroupOfUser,
    getUserInGroup
}