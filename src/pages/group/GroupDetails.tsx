import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GroupService } from '../../services/api/group/GroupService';
import { Groups, UserForGroup } from '../../types';
import GroupForm from '../../components/GroupForm';


const GroupDetails = () => {
  const { id } = useParams<{ id: string}>();
  const [group, setGroup] = useState<Groups | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const getGroupById = async () => {
      try {
      
        const result = await GroupService.getGroupByID(id as '');
        // console.log(result);
        setGroup(result);
      } catch (err) {
        setError('Erro ao carregar os dados do grupo.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getGroupById();

  }, [id]);

 

  const handleSave = async (namegroup: string, user: UserForGroup) => {
      try {
        await GroupService.insertUserForGroup(namegroup, user);
        // alert('Ldap criado com sucesso!');
        return;
      } catch (error) {
        // alert('Erro ao criar ldap.');
        return;
      }

  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (

    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Detalhes do Grupo</h1>
      
      {group && <GroupForm groupData={group} onSave={handleSave} />}
    </div>
  );
};

export default GroupDetails;