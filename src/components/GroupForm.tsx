import React, { useEffect, useState } from 'react';
import { Groups, UserInGroup, UserForGroup } from '../types';
import { GroupService } from '../services/api/group/GroupService';

type GroupFormProps = {
  groupData: Groups | null;
};

const GroupForm: React.FC<GroupFormProps> = ({ groupData }) => {
  const [group, setGroup] = useState<Groups>({
    id: 0,
    group_name: '',
  });
  const [userInGroup, setUserInGroup] = useState<UserInGroup[]>([]);
  const [usersAvailable, setUsersAvailable] = useState<UserInGroup[]>([]);
  const [activeTab, setActiveTab] = useState('group');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [usersPerPage] = useState(5);
  const [pageRange, setPageRange] = useState([1, 5]);
  const [currentPage1, setCurrentPage1] = useState(1);
  const [total1, setTotal1] = useState(0);
  const [usersPerPage1] = useState(5);
  const [pageRange1, setPageRange1] = useState([1, 5]);

  // Atualiza o estado do grupo quando o `groupData` mudar
  useEffect(() => {
    if (groupData) {
      setGroup(groupData);
    }
  }, [groupData]);

  const getMembros = async () => {
    try {
      const offset = (currentPage1 - 1) * usersPerPage1; // Calcular o offset
      const result = await GroupService.getUserInGroup(offset, usersPerPage1, group.group_name);
      setUserInGroup(result.results);
      setTotal1(result.count);

      // Ajustar as páginas disponíveis
      const totalPages1 = Math.ceil(result.count / usersPerPage1);
      const newRangeStart = Math.floor((currentPage1 - 1) / 5) * 5 + 1;
      const newRangeEnd = Math.min(newRangeStart + 4, totalPages1);
      setPageRange1([newRangeStart, newRangeEnd]);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Recarregar membros quando a página mudar
  useEffect(() => {
    getMembros();
  }, [currentPage1, group]); // Adiciona `currentPage1` como dependência para disparar a requisição

  const getUsersAvailable = async () => {
    try {
      const offset = (currentPage - 1) * usersPerPage; // Calcular o offset
      const result = await GroupService.getUsersAvailableForGroups(offset, usersPerPage, group.group_name);
      setUsersAvailable(result.results);
      setTotal(result.count);

      // Ajustar as páginas disponíveis para os usuários disponíveis
      const totalPages = Math.ceil(result.count / usersPerPage);
      const newRangeStart = Math.floor((currentPage - 1) / 5) * 5 + 1;
      const newRangeEnd = Math.min(newRangeStart + 4, totalPages);
      setPageRange([newRangeStart, newRangeEnd]);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'membros') {
      getUsersAvailable();
    }
  }, [currentPage, usersPerPage, activeTab]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const addUserInGroup = async (username: string) => {
    try {
      const user: UserForGroup = {
        user_name: username,
      };
      await GroupService.insertUserForGroup(group.group_name, user);
      getMembros();
      getUsersAvailable();
    } catch (err) {
      console.error(err);
    }
  };

  const removeUserInGroup = async (username: string) => {
    try {
      const user: UserForGroup = {
        user_name: username,
      };
      await GroupService.deleteUserForGroup(group.group_name, user);
      getMembros();
      getUsersAvailable();
    } catch (err) {
      console.error(err);
    }
  };

  // Funções de navegação para páginas
  const updatePageRange = (newPage: number) => {
    setCurrentPage(newPage);

    const newRangeStart = Math.floor((newPage - 1) / 5) * 5 + 1;
    const newRangeEnd = Math.min(newRangeStart + 4, Math.ceil(total / usersPerPage));

    setPageRange([newRangeStart, newRangeEnd]);
  };

  const updatePageRange1 = (newPage: number) => {
    setCurrentPage1(newPage);

    const newRangeStart = Math.floor((newPage - 1) / 5) * 5 + 1;
    const newRangeEnd = Math.min(newRangeStart + 4, Math.ceil(total1 / usersPerPage1));

    setPageRange1([newRangeStart, newRangeEnd]);
  };
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="border-b-slate-300 border-b-2 flex gap-2 mb-4">
        <button
          onClick={() => handleTabChange('group')}
          className={`px-4 py-2 ${activeTab === 'group' ? 'bg-slate-400' : ''}`}
        >
          Grupo
        </button>
        <button
          onClick={() => handleTabChange('membros')}
          className={`px-4 py-2 ${activeTab === 'membros' ? 'bg-slate-400' : ''}`}
        >
          Membros
        </button>
      </div>

      {activeTab === 'group' && (
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              name="title"
              disabled
              value={group.group_name}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Salvar
            </button>
          </div>
        </form>
      )}

      {activeTab === 'membros' && (
        <div className="overflow-x-auto flex gap-5 justify-">
          <div className="w-full">
            <table className="w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Usuários disponíveis</th>
                </tr>
              </thead>
              <tbody>
                {usersAvailable.map((member: UserInGroup) => (
                  <tr key={member.id} className="border-t hover:bg-gray-50 cursor-pointer">
                    <td className="text-left py-3 px-4">
                      <div className="flex items-center justify-between">
                        <span>{member.username}</span>
                        <button
                          onClick={() => addUserInGroup(member.username)}
                          className="bg-green-600 hover:bg-green-400 duration-200 px-2 rounded-md text-white text-lg font-bold">+</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-center mt-4">
              <button
                onClick={() => updatePageRange(currentPage - 1)}
                disabled={currentPage === 1}
                className="mx-1 px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
              >
                Anterior
              </button>

              {Array.from({ length: pageRange[1] - pageRange[0] + 1 }, (_, index) => (
                <button
                  key={pageRange[0] + index}
                  onClick={() => updatePageRange(pageRange[0] + index)}
                  className={`mx-1 px-3 py-1 rounded ${currentPage === pageRange[0] + index ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                  {pageRange[0] + index}
                </button>
              ))}

              <button
                onClick={() => updatePageRange(currentPage + 1)}
                disabled={currentPage === Math.ceil(total / usersPerPage)}
                className="mx-1 px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
              >
                Próximo
              </button>
            </div>
          </div>

          <div className="w-full">
            <table className="w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Membros no grupo</th>
                </tr>
              </thead>
              <tbody>
                {userInGroup.map((member: UserInGroup) => (
                  <tr key={member.id} className="border-t hover:bg-gray-50 cursor-pointer">
                    <td className="text-left py-3 px-4">
                      <div className="flex items-center justify-between">
                        <span>{member.username}</span>
                        <button
                          onClick={() => removeUserInGroup(member.username)}
                          className="bg-red-600 hover:bg-red-400 duration-200 px-3 rounded-md text-white text-lg font-bold">-</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-center mt-4">
              <button
                onClick={() => updatePageRange1(currentPage1 - 1)}
                disabled={currentPage1 === 1}
                className="mx-1 px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
              >
                Anterior
              </button>

              {Array.from({ length: pageRange1[1] - pageRange1[0] + 1 }, (_, index) => (
                <button
                  key={pageRange1[0] + index}
                  onClick={() => updatePageRange1(pageRange1[0] + index)}
                  className={`mx-1 px-3 py-1 rounded ${currentPage1 === pageRange1[0] + index ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                  {pageRange1[0] + index}
                </button>
              ))}

              <button
                onClick={() => updatePageRange1(currentPage1 + 1)}
                disabled={currentPage1 === Math.ceil(total1 / usersPerPage1)}
                className="mx-1 px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
              >
                Próximo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupForm;
