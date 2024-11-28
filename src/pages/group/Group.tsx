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
    const [searchTerm, setSearchTerm] = useState('');  // Termo de pesquisa
    const navigate = useNavigate();
    

    // Função para buscar os grupos com o termo de pesquisa
    const getAllGroups = async (search: string) => {
        try {
            const offset = (currentPage - 1) * usersPerPage; // Calcular o offset
            setLoading(true); // Começa a carregar antes de fazer a requisição
            const result = await GroupService.getAllGroup(offset, usersPerPage, search);  // Passa o search para a API
            setGroups(result.results as Groups[]);
            setTotal(result.count);
        } catch (error) {
            console.error("Erro ao buscar grupos:", error);
        } finally {
            setLoading(false);  // Finaliza o carregamento
        }
    };

    // Chama a API para carregar todos os grupos inicialmente
    useEffect(() => {
        getAllGroups('');  // Passa uma string vazia para buscar todos os grupos no início
    }, [currentPage, usersPerPage]);

    
    // Função que será chamada quando o usuário digitar o termo de pesquisa
    const handleSearch = () => {
        getAllGroups(searchTerm);  // Chama a função de buscar com o termo de pesquisa
    };

    const totalPages = Math.ceil(total / usersPerPage);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="container mx-auto">
            <p className="text-black text-4xl font-bold text-center mb-6">Grupos</p>
        
            {/* Campo de pesquisa com o botão */}
            <div className="mb-4 flex items-center">
                <input
                    type="text"
                    placeholder="Pesquisar por nome do grupo"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}  // Atualiza o termo de pesquisa
                    className="px-4 py-2 border rounded-md w-64"
                />
                <button
                    onClick={handleSearch}  // Chama a função de busca ao clicar no botão
                    className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 duration-200"
                >
                    Pesquisar
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Nome</th>
                        </tr>
                    </thead>
                    <tbody>
                        {groups.map((group: Groups) => (
                            <tr key={group.id} className="border-t hover:bg-gray-50 cursor-pointer">
                                <td onClick={() => navigate(`/group/${group.group_name}`)} className="text-left py-3 px-4">{group.group_name}</td>
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
