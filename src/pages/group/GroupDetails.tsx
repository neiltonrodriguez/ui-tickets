import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GroupService } from '../../services/api/group/GroupService';
import { Groups } from '../../types';
import GroupForm from '../../components/GroupForm';


const GroupDetails = () => {
    const { name } = useParams<{ name: string }>();
    const [group, setGroup] = useState<Groups | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const getGroupByName = async () => {
            try {
                const result = await GroupService.getGroupByName(name as '');
                setGroup(result.results[0]);
            } catch (err) {
                setError('Erro ao carregar os dados do grupo.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        getGroupByName();

    }, [name]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (

        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Detalhes do Grupo</h1>

            {group && <GroupForm groupData={group} />}
        </div>
    );
};

export default GroupDetails;