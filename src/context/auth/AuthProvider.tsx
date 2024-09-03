import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"
import { User } from "../../types"
import { LoginService } from "../../services/api/login/LoginService"



export const AuthProvider = ({children}: {children: JSX.Element }) => {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const validateToken = async () => {
            const token = localStorage.getItem('token');
            if(token){
                const data = await LoginService.check();
                if(data){
                    setUser(data)
                }
            }
        }

        validateToken();
    }, []);

    const signin = async (email: string, password: string) => {
       const data = await LoginService.login(email, password)
       if(data.user && data.access_token){
        setUser(data.user)
        setTokenStorage(data.access_token);
        setUserStorage(data.user);
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
        await LoginService.logout()
        setUser(null)
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
    return (
        <AuthContext.Provider value={{user, signin, signout}}>
            {children}
        </AuthContext.Provider>
    )
}