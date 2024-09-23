import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserService } from '../../services/api/user/UserService';
import { Users } from '../../types';
import UserForm from '../../components/UserForm'; // Importando o UserForm

const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<Users | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUserById = async () => {
      try {
        const result = await UserService.getUserByID(id as '');
        setUser(result);
      } catch (err) {
        setError('Erro ao carregar os dados do usuário.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getUserById();
  }, [id]);

  const handleSave = async (updatedUser: Users) => {
    try {
      await UserService.updateUser(updatedUser); // Atualize o método no seu UserService
      setUser(updatedUser); // Atualiza o estado com os novos dados
      alert('Usuário atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      alert('Erro ao atualizar usuário.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Detalhes do Usuário</h1>
      {user ? (
        <UserForm userData={user} onSave={handleSave} />
      ) : (
        <p>Usuário não encontrado.</p>
      )}
    </div>
  );
};

export default UserDetails;