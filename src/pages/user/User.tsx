import { UserService } from "../../services/api/user/UserService";
import { Users } from "../../types";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

const User = () => {
  const [user, setUser] = useState<Users[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja deletar este usuário?")) {
      try {
        await UserService.deleteUser(id);
        setUser(user.filter((u) => u.id !== id));
      } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        alert('Erro ao deletar usuário.');
      }
    }
  };

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const result = await UserService.getAllUser();
        console.log(result)
        setUser(result.results as Users[]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getAllUsers();
  }, []);
  if (loading) return <p>Loading...</p>;
  return (
    <div className="container mx-auto">
      <p className="text-black text-4xl font-bold text-center mb-6">
      </p>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Nome</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Usuário</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Email</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Telefone</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Ativo</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Atendente</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Admin</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Deletar</th>
            </tr>
          </thead>
          <tbody>
            {user.map((t: Users) => (
              // t.id = 1,
              <tr key={t.username} className="border-t hover:bg-gray-50 cursor-pointer">
                <td onClick={() => navigate(`/user/${t.id}`)} className="text-left py-3 px-4">{t.first_name}</td>
                <td onClick={() => navigate(`/user/${t.id}`)} className="text-left py-3 px-4">{t.username}</td>
                <td onClick={() => navigate(`/user/${t.id}`)} className="text-left py-3 px-4">{t.email}</td>
                <td onClick={() => navigate(`/user/${t.id}`)} className="text-left py-3 px-4">{t.cell_phone}</td>
                <td onClick={() => navigate(`/user/${t.id}`)} className="text-left py-3 px-4">{t.is_active ? 'sim' : 'não'}</td>
                <td onClick={() => navigate(`/user/${t.id}`)} className="text-left py-3 px-4">{t.attendant ? 'sim' : 'não'}</td>
                <td onClick={() => navigate(`/user/${t.id}`)} className="text-left py-3 px-4">{t.admin ? 'sim' : 'não'}</td>
                <td className="text-left py-3 px-4">
                <button
                    onClick={() => handleDelete(t.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default User