import { Ldap } from "../../../types";
import { Api } from "../Api";
import { ApiException } from "../ApiExceptions";

const getAllLdap = async (offset: number = 1, limit: number = 10) => {
    try {

        const { data } = await Api.get('/ldaps/',
            {
                params: {
                  offset,
                  limit  
                }
              }
        );
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

const getLdapAtributes = async (id: string) => {
    try {
        const { data } = await Api.get(`/ldaps/${id}/attributes`);	
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Error ao fazer get atributes')
    }

};

const updateLdap = async (ldap: Ldap) => {
    try {
        const { id, created_by, modified_by, created_time, modified_time, ...ldapToUpdate } = ldap;
        const { data } = await Api.put(`/ldaps/${ldap.id}/`, ldapToUpdate);
        alert('Ldap atualizado com sucesso')
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Error ao fazer update de Ldap na Api')
    }

};

const createLdap = async (ldap: Ldap) => {
    try {
        const { id, is_active, scan_schedule, import_groups, include_sub_ous, start_hour, repeate_type, cycle, cache_password, filter_class, filer_user, cn_attribute, dn_attribute, name_attribute, dn_login, open_ldap_atributo_state, open_ldap_atributo_state_du, created_by, modified_by, created_time, modified_time, ...ldapToCreate } = ldap;
        const { data } = await Api.post('/ldaps/', ldapToCreate);
        alert('Ldap Criado com sucesso')
        return data;
    } catch (error: any) {
        alert(error.response?.data?.detail || error.message || 'Erro ao criar ldap')
        return new ApiException(error.message || 'Error ao criar Ldap na Api')
    }

};

const deleteLdap = async (id: number) => {
    try {

        const { data } = await Api.delete(`/ldaps/${id}`);
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
    deleteLdap,
    getLdapAtributes
}