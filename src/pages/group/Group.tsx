import { GroupService } from "../../services/api/group/GroupService";
import { Groups } from "../../types";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Group = () => {
    const [groups, setGroups] = useState<Groups[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [usersPerPage] = useState(10);
    const navigate = useNavigate();

    //   const handleDelete = async (id: number) => {
    //     if (window.confirm("Tem certeza que deseja deletar este usuário?")) {
    //       try {
    //         await GroupService.deleteUser(id);
    //         setUsers(users.filter((u) => u.id !== id));
    //       } catch (error) {
    //         console.error('Erro ao deletar usuário:', error);
    //         alert('Erro ao deletar usuário.');
    //       }
    //     }
    //   };

    useEffect(() => {
        const getAllGroups = async () => {
            try {
                const offset = (currentPage - 1) * usersPerPage; // Calcular o offset
                const result = await GroupService.getAllGroup(offset, usersPerPage);
                setGroups(result.results as Groups[]);
                setTotal(result.count);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        getAllGroups();
    }, [currentPage, usersPerPage]);

    if (loading) return <p>Loading...</p>;

    const totalPages = Math.ceil(total / usersPerPage);

    return (
        <div className="container mx-auto">
            <p className="text-black text-4xl font-bold text-center mb-6">Grupos</p>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Nome</th>

                        </tr>
                    </thead>
                    <tbody>
                        {}
                        {groups.map((group: Groups) => (
                            <tr key={group.id} className="border-t hover:bg-gray-50 cursor-pointer">
                                {/* <td onClick={() => navigate(`/group/${group.id}/`)} className="text-left py-3 px-4">{group.group_name}</td> */}
                                <td onClick={() => navigate(`/group/1/`)} className="text-left py-3 px-4">{group.group_name}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
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

export default Group;
