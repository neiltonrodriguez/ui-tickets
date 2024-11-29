import React, { useEffect, useState } from 'react';
import { Users } from '../types';
import { useNavigate } from 'react-router-dom';

type UserFormProps = {
  userData: Users | null; // Permite que seja null quando criando um novo usuário
  onSave: (user: Users) => void;
  isEditMode: boolean; // Nova prop para determinar o modo
};

const UserForm: React.FC<UserFormProps> = ({ userData, onSave, isEditMode }) => {
  const [user, setUser] = useState<Users>({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    phone: '',
    cell_phone: '',
    is_active: false,
    attendant: false,
    admin: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const updatedValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setUser(prevUser => ({
      ...prevUser,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(user);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nome</label>
        <input
          type="text"
          name="first_name"
          value={user.first_name}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Sobrenome</label>
        <input
          type="text"
          name="last_name"
          value={user.last_name}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Usuário</label>
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
          disabled={isEditMode}
          required={!isEditMode}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Senha</label>
        <input
          type="password"
          name="password"
          required
          value={user.password}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Telefone</label>
        <input
          type="tel"
          name="phone"
          value={user.phone}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Celular</label>
        <input
          type="tel"
          name="cell_phone"
          value={user.cell_phone}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            name="is_active"
            checked={user.is_active}
            onChange={handleChange}
            className="form-checkbox h-5 w-5 text-indigo-600"
          />
          <span className="ml-2 text-gray-700">Ativo</span>
        </label>
      </div>
      <div>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            name="attendant"
            checked={user.attendant}
            onChange={handleChange}
            className="form-checkbox h-5 w-5 text-indigo-600"
          />
          <span className="ml-2 text-gray-700">Atendente</span>
        </label>
      </div>
      <div>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            name="admin"
            checked={user.admin}
            onChange={handleChange}
            className="form-checkbox h-5 w-5 text-indigo-600"
          />
          <span className="ml-2 text-gray-700">Admin</span>
        </label>
      </div>
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => navigate(`/user/`)}
          className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
        Voltar
        </button>
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

export default UserForm;
