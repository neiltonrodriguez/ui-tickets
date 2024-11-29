import { LdapService } from "../../services/api/ldap/LdapService";
import { Ldap } from "../../types";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

const Ldaps = () => {
  const [ldaps, setLdaps] = useState<Ldap[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [ldapsPerPage] = useState(10);
  const navigate = useNavigate();


  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja deletar este usuário?")) {
      try {
        await LdapService.deleteLdap(id);
        setLdaps(ldaps.filter((u) => u.id !== id));
      } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        // alert('Erro ao deletar usuário.');
      }
    }
  };

  useEffect(() => {
    const getAllLdap = async () => {
      try {
        const offset = (currentPage - 1) * ldapsPerPage;
        const result = await LdapService.getAllLdap(offset, ldapsPerPage);
        setLdaps(result.results as Ldap[]);
        setTotal(result.count);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getAllLdap();
  }, [currentPage, ldapsPerPage]);
  if (loading) return <p>Loading...</p>;
  const totalPages = Math.ceil(total / ldapsPerPage);
  return (
    <div className="container mx-auto">
      <p className="text-black text-4xl font-bold text-center mb-6">LDAP</p>
      <button className="bg-blue-600 rounded-md px-5 py-2 shadow-md my-3 text-white hover:bg-green-400 duration-200" onClick={() => navigate(`/ldap/0/new`)}>Novo LDAP</button>
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
                <td onClick={() => navigate(`/ldap/${t.id}/edit/`)} className="text-left py-3 px-4">{t.title}</td>
                <td onClick={() => navigate(`/ldap/${t.id}/edit/`)} className="text-left py-3 px-4">{t.host}</td>
                <td onClick={() => navigate(`/ldap/${t.id}/edit/`)} className="text-left py-3 px-4">{t.port}</td>
                <td onClick={() => navigate(`/ldap/${t.id}/edit/`)} className="text-left py-3 px-4">{t.domain}</td>
                <td onClick={() => navigate(`/ldap/${t.id}/edit/`)} className="text-left py-3 px-4">{t.is_active ? 'sim' : 'não'}</td>
                <td onClick={() => navigate(`/ldap/${t.id}/edit/`)} className="text-left py-3 px-4">{t.user}</td>
                <td className="text-left py-3 px-4">
                <button
                    onClick={() => handleDelete(t.id as number)}
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
  )
}

export default Ldaps