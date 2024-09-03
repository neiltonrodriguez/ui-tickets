import { useContext, useState } from "react"
import { AuthContext } from "../../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const auth = useContext(AuthContext)
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (username && password) {
      const isLogged = await auth.signin(username, password)
      if (isLogged) {
        navigate('/app-band')
      }
    }
  }

  return (
    <div className="bg-purple-950 flex w-full h-screen items-center justify-center">
      <div className="flex rounded-lg w-96 h-48 m-auto bg-slate-100 flex-col gap-5 p-5 items-center justify-center">
        <div className="flex">
          <label className="mx-2">Email:</label>
          <input className="border text-purple-900" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label className="mx-2">Senha:</label>
          <input className="border  text-purple-900" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button className="bg-purple-950 text-white px-10 rounded-md hover:bg-purple-800 duration-200" onClick={handleLogin}>Logar</button>
      </div>

    </div>
  );
}