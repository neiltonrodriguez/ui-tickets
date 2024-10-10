import React, { useEffect, useState } from 'react';
import { Ldap } from '../types';
import { LdapService } from '../services/api/ldap/LdapService';


type LdapFormProps = {
    ldapData: Ldap | null;
    onSave: (ldap: Ldap) => void;
    isEditMode: boolean;
};

const LdapForm: React.FC<LdapFormProps> = ({ ldapData, onSave, isEditMode }) => {
    const [ldap, setLdap] = useState<Ldap>({
        title: '',
        host: '',
        provider: 0,
        port: 0,
        domain: '',
        auth_type: 0,
        user: '',
        password: '',
        is_active: false,
        scan_schedule: false,
        import_groups: false,
        include_sub_ous: false,
        start_hour: new Date(),
        repeate_type: 0,
        cycle: '',
        cache_password: false,
        filter_class: '',
        filer_user: '',
        cn_attribute: '',
        dn_attribute: '',
        name_attribute: '',
        dn_base: '',
        dn_login: '',
        open_ldap_atributo_state: '',
        open_ldap_atributo_state_du: '',
        created_by: '',
        modified_by: '',
        created_time: new Date(),
        modified_time: new Date(),
    });
    const [activeTab, setActiveTab] = useState('ldap');
    const [userFields, setUserFields] = useState<string[]>([]);
    // const [systemFields, setSystemFields] = useState<string[]>([]);

    useEffect(() => {
        if (ldapData) {
            setLdap(ldapData);
        }
    }, [ldapData]);

    useEffect(() => {
        const getAtributes = async () => {
            try {
                // const result = await LdapService.getLdapAtributes('2');
                setUserFields(['first_name', 'last_name', 'email', 'phone', 'cell_phone']);
            } catch (err) {

                console.error(err);
            } finally {

            }
        };

        getAtributes();

    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        const updatedValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        setLdap(prevLdap => ({
            ...prevLdap,
            [name]: updatedValue,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const ldapToSave = { ...ldap };

        if (!isEditMode) {
            delete ldapToSave.id;
        }
        onSave(ldap);
        handleTabChange('atributos');
    };
    const handleSubmitAtributes = (e: React.FormEvent) => {
        e.preventDefault();
        const ldapToSave = { ...ldap };

        if (!isEditMode) {
            delete ldapToSave.id;
        }
        onSave(ldap);
        handleTabChange('ous');
    };
    const handleSubmitOUs = (e: React.FormEvent) => {
        e.preventDefault();
        const ldapToSave = { ...ldap };

        if (!isEditMode) {
            delete ldapToSave.id;
        }
        onSave(ldap);
        // handleTabChange('ous');
    };

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };


    return (
        <div>

            <div className="border-b-slate-300 border-b-2 flex gap-2 mb-4">
                <button
                    onClick={() => handleTabChange('ldap')}
                    className={`px-4 py-2 ${activeTab === 'ldap' ? 'bg-slate-400' : ''}`}>
                    LDAP
                </button>
                <button
                    onClick={() => handleTabChange('atributos')}
                    className={`px-4 py-2 ${activeTab === 'atributos' ? 'bg-slate-400' : ''}`}>
                    Atributos
                </button>
                <button
                    onClick={() => handleTabChange('ous')}
                    className={`px-4 py-2 ${activeTab === 'ous' ? 'bg-slate-400' : ''}`}>
                    OUs
                </button>

            </div>

            {activeTab === 'ldap' && (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Título</label>
                        <input
                            type="text"
                            name="title"
                            value={ldap.title}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Servidor</label>
                        <input
                            type="text"
                            name="host"
                            value={ldap.host}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Porta</label>
                        <input
                            type="number"
                            name="port"
                            value={ldap.port}
                            onChange={handleChange}

                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Domínio</label>
                        <input
                            type="text"
                            name="domain"
                            value={ldap.domain}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Provedor</label>
                        <input
                            type="number"
                            name="provider"
                            value={ldap.provider}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                name="is_active"
                                checked={ldap.is_active}
                                onChange={handleChange}
                                className="form-checkbox h-5 w-5 text-indigo-600"
                            />
                            <span className="ml-2 text-gray-700">Ativo</span>
                        </label>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Auth Type</label>
                        <input
                            type="number"
                            name="auth_type"
                            value={ldap.auth_type}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />

                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Usuário</label>
                        <input
                            type="text"
                            name="user"
                            value={ldap.user}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />

                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Senha</label>
                        <input
                            type="text"
                            name="password"
                            value={ldap.password}
                            onChange={handleChange}
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
            {activeTab === 'atributos' && (
                <form onSubmit={handleSubmitAtributes}>
                    {userFields.map((field, index) => (
                        <div className="grid gap-3 mb-3 md:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Título</label>
                                <select
                                    name="title"
                                    // value={ldap.title}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                >
                                    <option value="1" key={index}>{field}</option>

                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Servidor</label>
                                <select
                                    name="title"
                                    // value={ldap.title}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                >
                                    <option value="1" key={index}>{field}</option>
                                </select>
                            </div>
                        </div>
                    ))}


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
            {activeTab === 'ous' && (
                <form onSubmit={handleSubmitOUs}>

                    <div className="grid gap-3 mb-3 md:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Source</label>
                            <input
                                type="text"
                                name="title"
                                // value={ldap.title}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        
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
        </div>
    );
};

export default LdapForm;