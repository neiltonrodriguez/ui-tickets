import { Api } from "../Api";
import { ApiException } from "../ApiExceptions";

const getAllDomain = async () => {
    try {
        const { data } = await Api.get('/login/user/domains/');
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Error ao logar na Api')
    }

};


export const DomainService = {
    getAllDomain,
}