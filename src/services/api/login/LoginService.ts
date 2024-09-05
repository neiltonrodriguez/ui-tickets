import { Api } from "../Api";
import { ApiException } from "../ApiExceptions";
import { User } from "../../../types";

const login = async (username: string, password: string) => {
    try {
        // const { data } = await Api.post('/login/', {username, password});
        const data =
        {
            "usuario": {
                "id": 3,
                "nome": username + password,
                "email": "teste@teste.com",
                "foto": "https://randomuser.me/api/portraits",
                "tipo": 1
            },
            "access": "eyJ0eXAiOiJK"

        };

        // Simular um atraso na resposta para imitar uma API real
        await new Promise(resolve => setTimeout(resolve, 500)); // 500ms de atraso
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Error ao logar na Api')
    }

};
const logout = () => {
    try {
        const data = Api.post('/logout');
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Error ao fazer logout na Api')
    }

};
const check = async () => {
    try {
        // const { data } = await Api.post('/login/user/checktoken/');
        const data: User =
        {
            "id": 3,
            "nome": "seu joão",
            "email": "teste@teste.com",
            "foto": "https://randomuser.me/api/portraits",
            "tipo": 1
        };
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