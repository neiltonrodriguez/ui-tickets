import { Ldap } from "../../../types";
import { Api } from "../Api";
import { ApiException } from "../ApiExceptions";

const getAllLdap = async () => {
    try {

        const { data } = await Api.get('/ldaps/');
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Error ao fazer getAll de Ldap na Api')
    }

};

const getLdapByID = async (id: string) => {
    try {

        const { data } = await Api.get('/ldaps/' + id);
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Error ao fazer getById de Ldap na Api')
    }

};

const updateLdap = async (ldap: Ldap) => {
    try {

        const { data } = await Api.put(`/ldaps/${ldap.id}`, ldap);
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Error ao fazer update de Ldap na Api')
    }

};

const createLdap = async (ldap: Ldap) => {
    try {

        const { data } = await Api.post('/ldaps/', ldap);
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Error ao criar Ldap na Api')
    }

};

const deleteLdap = async (id: number) => {
    try {

        const { data } = await Api.delete(`/ldapss/${id}`);
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Error ao deletar Ldap na Api')
    }

};


export const LdapService = {
    getAllLdap,
    getLdapByID,
    updateLdap,
    createLdap,
    deleteLdap
}