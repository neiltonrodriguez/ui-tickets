import React, { useEffect, useState } from 'react';
import { Groups, UserForGroup, UserInGroup } from '../types';
import { GroupService } from '../services/api/group/GroupService';


type GroupFormProps = {
    groupData: Groups | null;
    onSave: (namegroup: string, user: UserForGroup) => void;
};

const GroupForm: React.FC<GroupFormProps> = ({ groupData, onSave}) => {
    const [group, setGroup] = useState<Groups>({
        id: 0,
        group_name: '',
    });
    const [userInGroup, setUserInGroup] = useState<UserInGroup[]>([]);
    const [activeTab, setActiveTab] = useState('group');

    useEffect(() => {
        if (groupData) {
            setGroup(groupData);
        }
    }, [groupData]);

    useEffect(() => {
        const getMembros = async () => {
            try {
                const result = await GroupService.getUserInGroup(group.group_name);
                setUserInGroup(result.results);
            } catch (err) {

                console.error(err);
            } finally {

            }
        };

        getMembros();

    }, [group, userInGroup]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        const updatedValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        setGroup(prevLdap => ({
            ...prevLdap,
            [name]: updatedValue,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const groupToSave = { ...group };

        // onSave(groupToSave);
        handleTabChange('membros');
    };


    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };


    return (
        <div>

            <div className="border-b-slate-300 border-b-2 flex gap-2 mb-4">
                <button
                    onClick={() => handleTabChange('group')}
                    className={`px-4 py-2 ${activeTab === 'group' ? 'bg-slate-400' : ''}`}>
                    Grupo
                </button>
                <button
                    onClick={() => handleTabChange('membros')}
                    className={`px-4 py-2 ${activeTab === 'membros' ? 'bg-slate-400' : ''}`}>
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
                            // onChange={handleChange}
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
                <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Usuário</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Email</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Phone</th>

                        </tr>
                    </thead>
                    <tbody>
                        {userInGroup.map((member: UserInGroup) => (
                            <tr key={group.group_name} className="border-t hover:bg-gray-50 cursor-pointer">
                                <td className="text-left py-3 px-4">{member.username}</td>
                                <td className="text-left py-3 px-4">{member.email}</td>
                                <td className="text-left py-3 px-4">{member.phone}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            )}

        </div>
    );
};

export default GroupForm;