import React, { useEffect, useState } from 'react';
import { Ldap } from '../types';

type LdapFormProps = {
    ldapData: Ldap;
    onSave: (ldap: Ldap) => void;
};

const LdapForm: React.FC<LdapFormProps> = ({ ldapData, onSave }) => {
    const [ldap, setLdap] = useState<Ldap>(ldapData);

    useEffect(() => {
        setLdap(ldapData);
    }, [ldapData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        // Para checkboxes, verificamos se o tipo é checkbox e, se sim, usamos 'checked', caso contrário, usamos 'value'
        const updatedValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

        setLdap(prevLdap => ({
            ...prevLdap,
            [name]: updatedValue,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(ldap);
    };

    return (
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
                    type="text"
                    name="port"
                    value={ldap.port}
                    onChange={handleChange}
                    disabled
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Domínio</label>
                <input
                    type="text"
                    name="domnain"
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
    );
};

export default LdapForm;