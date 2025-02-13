import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/auth/AuthContext";
import { DomainService } from "../../services/api/domain/DomainService";
import { useNavigate } from "react-router-dom";
import fotoTutorial from '../../assets/img/tutorial.jpg';
import { Domain } from "../../types";

export const Login = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('');
  const [domain, setDomain] = useState<Domain[] | null>([]);
  const [showVideo, setShowVideo] = useState(false);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (username && password) {
      const response = await auth.signin(username, password);
      if (response.success) {
        navigate('/');
      } else {
        setErrorMessage(response.message);
      }
    }
  };

  const abrirVideo = () => {
    setShowVideo(true);
  };

  const fecharVideo = () => {
    setShowVideo(false);
  };

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
      {showVideo && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg relative">
            <button onClick={fecharVideo} className="absolute top-2 right-2 text-gray-700 hover:text-gray-900">
              &times;
            </button>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/Xgjo8mSDW1c?si=8yQX1eJlEFVTdKU5"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
      <section className="dark:bg-gray-900">
        <div className="flex max-w-7xl h-screen items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="flex-1 w-full md:flex items-center hidden justify-center">
            <div>
              <h1 className="text-4xl font-bold">NOSSO <span >SERVICE</span><span className="text-red-500">DESK</span> MUDOU!</h1>
              <h1 className="text-2xl text-center text-gray-500 font-semibold">clique no vídeo e confira as mudanças</h1>
              <div className="flex items-center justify-center gap-3 mt-5">
                <img
                  onClick={abrirVideo}
                  src={fotoTutorial}
                  className="w-52 cursor-pointer hover:scale-105 hover:rotate-6 duration-200"
                  alt="Tutorial"
                />
              </div>
            </div>
          </div>
          <form onSubmit={handleLogin} className="w-full shadow-lg flex-1 bg-white h-auto rounded-lg">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                Digite seus dados de acesso
              </h1>
              <div>
                {domain && domain.length > 0 ? (
                  <div>
                    <label className="label-form">Domínio</label>
                    <select
                      value={selectedDomain}
                      onChange={(e) => setSelectedDomain(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      {Array.isArray(domain) && domain.map((d) => (
                        <option key={d.id} value={d.id}>{d.nome}</option>
                      ))}
                    </select>
                  </div>
                ) : ''}
              </div>
              <div>
                <label className="label-form">Usuário</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="seu usuário"
                />
              </div>
              <div>
                <label className="label-form">Senha</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
              <button
                type="submit"
                className="w-full text-black bg-orange-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};