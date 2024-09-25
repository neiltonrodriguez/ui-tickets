import axios from "axios";
import { ApiException } from "../ApiExceptions";

const getAllDomain = async () => {
    try {
        const { data } = await axios.get(import.meta.env.VITE_URL_API + '/login/user/domains/');
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Error ao logar na Api')
    }

};


export const DomainService = {
    getAllDomain,
}