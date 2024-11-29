import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserService } from '../../services/api/user/UserService';
import { Users } from '../../types';
import UserForm from '../../components/UserForm'; // Importando o UserForm
import { useNavigate } from 'react-router-dom';

const UserDetails = () => {
  const { id, mode } = useParams<{ id: string, mode: string }>();
  const [user, setUser] = useState<Users | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  

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

    if (mode === 'edit') {
      getUserById();
    } else {
      setLoading(false);
    }
  }, [id, mode]);

  

  const handleSave = async (updateUser: Users) => {
    if (mode === 'new') {
      try {
        await UserService.createUser(updateUser);
        navigate('/user')
        return;
      } catch (error) {
        console.error('Erro ao criar usuário:', error);
        alert('Erro ao criar usuário.');
        return;
      }

    } else if (mode === 'edit') {
      try {
        await UserService.updateUser(updateUser);
        setUser(updateUser);
        navigate('/user')
        // alert('Usuário atualizado com sucesso!');
      } catch (error: any) {
        const errorMessage = error.response?.data?.detail || error.message || 'Erro ao atualizar usuário.';
        console.log(errorMessage) 
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (

    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Detalhes do Usuário</h1>
      {user && mode != 'new' ? (
        <UserForm userData={user} onSave={handleSave} isEditMode={true} />
      ) : (
        <UserForm userData={user} onSave={handleSave} isEditMode={false} />
      )}
    </div>
  );
};

export default UserDetails;