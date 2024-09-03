import { Api } from "../Api";
import { ApiException } from "../ApiExceptions";

const login = async (email: string, password: string) => {
    try {
        const { data } = await Api.post('/login', {email, password});
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Error ao logar na Api')
    }

};
const logout = () => {
    try {
        const data  = Api.post('/logout');
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Error ao fazer logout na Api')
    }

};
const check = async () => {
    try {
        const { data }  = await Api.post('/me');
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Error ao checkar token na Api')
    }

};


export const LoginService = {
   login,
   check,
   logout
}