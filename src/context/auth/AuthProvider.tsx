import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"
import { User } from "../../types"
import { LoginService } from "../../services/api/login/LoginService"
import { ApiException } from '../../services/api/ApiExceptions';



export const AuthProvider = ({ children }: { children: JSX.Element }) => {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const validateToken = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const data = await LoginService.check();
                if (data.code === 'token_valid') {
                    setUser(data as User)
                }
            }
        }

        validateToken();
    }, []);

    const signin = async (username: string, password: string) => {
        const data = await LoginService.login(username, password)
        if (data instanceof ApiException) {// Trate o erro de forma apropriada
            return false;
        }
        if (data.user.length > 0 && data.access) {
            setUser(data.user[0]);
            setTokenStorage(data.access);
            setUserStorage(data.user[0]);
            return true;
        }
        return false;

    }


    const setTokenStorage = (token: string) => {
        localStorage.setItem('token', token)
    }
    const setUserStorage = (user: User | null) => {
        localStorage.setItem('user', JSON.stringify(user))
    }

    const signout = async () => {
        // await LoginService.logout()
        setUser(null)
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
    return (
        <AuthContext.Provider value={{ user, signin, signout }}>
            {children}
        </AuthContext.Provider>
    )
}