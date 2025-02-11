import React, { useEffect, useState } from 'react';
import { Attributes, Ldap } from '../types';
import { useNavigate } from 'react-router-dom';
import { LdapService } from '../services/api/ldap/LdapService';
import { OUData } from '../interfaces';


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
    const [attributes, setAttributes] = useState<Attributes[]>([]);
    const [ous, setOus] = useState<OUData[]>([]);
    const navigate = useNavigate()
    // const [systemFields, setSystemFields] = useState<string[]>([]);

    useEffect(() => {
        if (ldapData) {
            setLdap(ldapData);
        }
    }, [ldapData]);



    useEffect(() => {
        if (activeTab === 'ous') {
            getOUs();
        } else if (activeTab === 'atributos') {
            getAttributes();
        }
    }, [activeTab]);

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

    const checkConnection = async () => {
        try {
            const result = await LdapService.checkConnectionLdap(ldap)
            console.log(result)
        } catch (error) {
            // alert('Erro ao atualizar ldap.');
        }

    };

    const updateBaseLdap = async () => {
        try {
            const result = await LdapService.updateBaseLdap(ldap.id as number)
            console.log(result)
        } catch (error) {
            // alert('Erro ao atualizar ldap.');
        }

    };

    const getOUs = async () => {
        try {
            const result = await LdapService.getOusByLdap(ldap.id as number)
            setOus(result.results)
        } catch (error) {
            console.log(error)
        }

    };
    const getAttributes = async () => {
        try {
            const result = await LdapService.getAttributesByLdap(ldap.id as number)
            setAttributes(result.results)
        } catch (error) {
            console.log(error)
        }

    };


    const handleChangeOU = async (e: React.ChangeEvent<HTMLInputElement>, ouId: number) => {
        try {
            const ou: OUData = {
                source: e.target.value,
            };
            const result = await LdapService.updateOU(ldap.id as number, ouId, ou)
            console.log(result)
            getOUs();
        } catch (error) {
            console.log(error)
        }

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
                                disabled={!isEditMode}
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
                        <label className="block text-sm font-medium text-gray-700">DN Base</label>
                        <input
                            type="text"
                            name="dn_base"
                            value={ldap.dn_base}
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
                            type="password"
                            name="password"
                            value={ldap.password}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />

                    </div>
                    <div className="flex justify-end gap-5">
                        <button
                            type="button"
                            onClick={() => navigate(`/ldap/`)}
                            className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Voltar
                        </button>
                        <button
                            type="button"
                            onClick={updateBaseLdap}
                            className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-700 hover:bg-orange-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Atualizar Base LDAP
                        </button>
                        <button
                            type="button"
                            onClick={checkConnection}
                            className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Testar Conexão
                        </button>

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
                    {attributes.map((field, index) => (
                        <div className="grid gap-3 mb-3 md:grid-cols-2" key={index}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Título</label>
                                <input
                                    name="title"
                                    value={field.ldap_field}
                                    // onChange={handleChange}
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Servidor</label>
                                <input
                                    name="title"
                                    value={field.system_field}
                                    // onChange={handleChange}
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                    ))}


                    <div className="flex justify-end">
                        {/* <button
                            type="submit"
                            className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Salvar
                        </button> */}
                    </div>
                </form>
            )}
            {activeTab === 'ous' && (
                <form onSubmit={handleSubmitOUs}>

                    <div className="grid gap-3 mb-3 md:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Source</label>

                            {ous.map((ou, index) => (
                                <div key={index}>
                                    <input
                                        type="text"
                                        name={`source-${ou.id}`} // Um nome único para cada input
                                        value={ou.source} // Valor do source do objeto
                                        onChange={(e) => handleChangeOU(e, ou.id as number)} // Atualiza com o id correspondente
                                        required
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    />

                                </div>
                            ))}

                        </div>

                    </div>

                    <div className="flex justify-end">

                    </div>
                </form>
            )}
        </div>
    );
};

export default LdapForm;