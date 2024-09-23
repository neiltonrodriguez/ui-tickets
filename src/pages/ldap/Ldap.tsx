import { LdapService } from "../../services/api/ldap/LdapService";
import { Ldap } from "../../types";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

const Ldaps = () => {
  const [ldaps, setLdaps] = useState<Ldap[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja deletar este usuário?")) {
      try {
        await LdapService.deleteLdap(id);
        setLdaps(ldaps.filter((u) => u.id !== id));
      } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        alert('Erro ao deletar usuário.');
      }
    }
  };

  useEffect(() => {
    const getAllLdap = async () => {
      try {
        const result = await LdapService.getAllLdap();
        console.log(result)
        setLdaps(result.results as Ldap[]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getAllLdap();
  }, []);
  if (loading) return <p>Loading...</p>;
  return (
    <div className="container mx-auto">
      <p className="text-black text-4xl font-bold text-center mb-6">
      </p>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Título</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Host</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Porta</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Domínio</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Ativo</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Usuário</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Deletar</th>
            </tr>
          </thead>
          <tbody>
            {ldaps.map((t: Ldap) => (
              // t.id = 1,
              <tr key={t.id} className="border-t hover:bg-gray-50 cursor-pointer">
                <td onClick={() => navigate(`/ldap/${t.id}`)} className="text-left py-3 px-4">{t.title}</td>
                <td onClick={() => navigate(`/ldap/${t.id}`)} className="text-left py-3 px-4">{t.host}</td>
                <td onClick={() => navigate(`/ldap/${t.id}`)} className="text-left py-3 px-4">{t.port}</td>
                <td onClick={() => navigate(`/ldap/${t.id}`)} className="text-left py-3 px-4">{t.domain}</td>
                <td onClick={() => navigate(`/ldap/${t.id}`)} className="text-left py-3 px-4">{t.is_active ? 'sim' : 'não'}</td>
                <td onClick={() => navigate(`/ldap/${t.id}`)} className="text-left py-3 px-4">{t.user}</td>
                <td className="text-left py-3 px-4">
                <button
                    onClick={() => handleDelete(t.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Ldaps