import { useContext, useState } from "react"
import { AuthContext } from "../../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import fotoLogin from '../../assets/img/login.jpg';

export const Login = () => {
  const auth = useContext(AuthContext)
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (username && password) {
      const isLogged = await auth.signin(username, password)
      console.log(isLogged)
      if (isLogged) {
        navigate('/')
      }
    }
  }

  return (
    <div>
      <section className="dark:bg-gray-900">
        <div className="flex max-w-7xl h-screen items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="flex-1 w-full md:flex items-center hidden justify-center">
          <img src={fotoLogin} className="w-96" />
          </div>
          <div
            className="w-full shadow-lg flex-1 bg-white h-96 rounded-lg">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                Digite seus dados de acesso
              </h1>

              <div>
                <label className="label-form">Usuário</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="seu usuário" />
              </div>
              <div>
                <label className="label-form">Senha</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <button type="submit" onClick={handleLogin}
                className="w-full text-black bg-orange-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign
                in</button>

            </div>
          </div>

        </div>
      </section>
    </div>
  );
}