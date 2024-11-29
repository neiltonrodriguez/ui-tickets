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
  const [search, setSearch] = useState('');  // Termo de pesquisa

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

  const getAllUsers = async (search: string) => {
    try {
      const offset = (currentPage - 1) * usersPerPage; // Calcular o offset
      const result = await UserService.getAllUser(offset, usersPerPage, search);
      setUsers(result.results as Users[]);
      setTotal(result.count);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers('');  // Passa uma string vazia para buscar todos os grupos no início
  }, [currentPage, usersPerPage]);


  const handleSearch = () => {
    getAllUsers(search);  // Chama a função de buscar com o termo de pesquisa
  };

  if (loading) return <p>Loading...</p>;

  const totalPages = Math.ceil(total / usersPerPage);

  return (
    <div className="container mx-auto">
      <p className="text-black text-4xl font-bold text-center mb-6">Usuários</p>
      {/* Campo de pesquisa com o botão */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <input
              type="text"
              placeholder="Pesquisar por nome do grupo"
              value={search}
              onChange={(e) => setSearch(e.target.value)}  // Atualiza o termo de pesquisa
              className="px-4 py-2 border rounded-md w-64"
          />
          <button
              onClick={handleSearch}  // Chama a função de busca ao clicar no botão
              className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 duration-200"
          >
              Pesquisar
          </button>
        </div>
        <button className="ml-2 bg-blue-600 text-white px-8 py-2 rounded-md hover:bg-blue-500 duration-200" onClick={() => navigate(`/user/0/new`)}>Novo Usuário</button>
                
      </div>
      
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
        {/* Modal de permissão */}
      </div>

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
