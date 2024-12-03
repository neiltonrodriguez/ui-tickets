import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../../context/auth/AuthContext";
import { DomainService } from "../../services/api/domain/DomainService";
import { useNavigate } from "react-router-dom";
import fotoLogin from '../../assets/img/login.jpg';
import { Domain } from "../../types";

export const Login = () => {
  const auth = useContext(AuthContext)
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('');
  const [domain, setDomain] = useState<Domain[] | null>([]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
      if (username && password) {
        const response= await auth.signin(username, password)
        if (response.success) {
          navigate('/')
      } else {
          // Exibir a mensagem de erro no formulário
          setErrorMessage(response.message);
      }
      }
    
    
  }

  useEffect(() => {
    const getDomain = async () => {
      try {
        const result = await DomainService.getAllDomain();
        setDomain(result.results as Domain[]);
      } catch (error) {
        console.error(error);
      }
    };

    getDomain();
  }, []);

  return (
    <div>
      <section className="dark:bg-gray-900">
        <div className="flex max-w-7xl h-screen items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="flex-1 w-full md:flex items-center hidden justify-center">
            <img src={fotoLogin} className="w-96" />
          </div>
          <form onSubmit={handleLogin}
            className="w-full shadow-lg flex-1 bg-white h-auto rounded-lg">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                Digite seus dados de acesso
              </h1>

              <div>
                {domain && domain.length > 0 ?
                  <div>
                    <label className="label-form">Domínio</label>
                    <select value={selectedDomain} onChange={(e) => setSelectedDomain(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      {Array.isArray(domain) && domain.map((d) => (
                        <option key={d.id} value={d.id}>{d.nome}</option>
                      ))}

                    </select>
                  </div>
                  : ''}
              </div>

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
              {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
              <button type="submit"
                className="w-full text-black bg-orange-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign
                in</button>

            </div>
          </form>

        </div>
      </section>
    </div>
  );
}