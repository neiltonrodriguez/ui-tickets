import { UserService } from "../../services/api/user/UserService";
import { Users } from "../../types";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

const User = () => {
  const [users, setUsers] = useState<Users[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [usersPerPage] = useState(10);
  const navigate = useNavigate();

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja deletar este usuário?")) {
      try {
        await UserService.deleteUser(id);
        setUsers(users.filter((u) => u.id !== id));
      } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        alert('Erro ao deletar usuário.');
      }
    }
  };

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const result = await UserService.getAllUser(currentPage, usersPerPage);
        setUsers(result.results as Users[]); // Atualiza o estado com os usuários da página atual
        setTotal(result.count); // Atualiza o total de usuários
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getAllUsers();
  }, [currentPage, usersPerPage]);

  if (loading) return <p>Loading...</p>;

  const totalPages = Math.ceil(total / usersPerPage);

  return (
    <div className="container mx-auto">
      <p className="text-black text-4xl font-bold text-center mb-6">Usuários</p>
      <button className="bg-green-600 rounded-md px-5 py-1 shadow-md my-3 text-white hover:bg-green-400 duration-200" onClick={() => navigate(`/user/0/new`)}>Novo Usuário</button>
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
            {users.map((user: Users) => (
              <tr key={user.id} className="border-t hover:bg-gray-50 cursor-pointer">
                <td onClick={() => navigate(`/user/${user.id}/edit/`)} className="text-left py-3 px-4">{user.first_name}</td>
                <td onClick={() => navigate(`/user/${user.id}/edit`)} className="text-left py-3 px-4">{user.username}</td>
                <td onClick={() => navigate(`/user/${user.id}/edit`)} className="text-left py-3 px-4">{user.email}</td>
                <td onClick={() => navigate(`/user/${user.id}/edit`)} className="text-left py-3 px-4">{user.cell_phone}</td>
                <td onClick={() => navigate(`/user/${user.id}/edit`)} className="text-left py-3 px-4">{user.is_active ? 'sim' : 'não'}</td>
                <td onClick={() => navigate(`/user/${user.id}/edit`)} className="text-left py-3 px-4">{user.attendant ? 'sim' : 'não'}</td>
                <td onClick={() => navigate(`/user/${user.id}/edit`)} className="text-left py-3 px-4">{user.admin ? 'sim' : 'não'}</td>
                <td className="text-left py-3 px-4 flex items-center justify-center">
                  <button
                    onClick={() => handleDelete(user.id as number)}
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

      {/* Paginação */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="mx-1 px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
        >
          Anterior
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="mx-1 px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
        >
          Próximo
        </button>
      </div>
    </div>
  );
};

export default User;
