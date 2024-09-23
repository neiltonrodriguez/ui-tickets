import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LdapService } from '../../services/api/ldap/LdapService';
import { Ldap } from '../../types';
import LdapForm from '../../components/LdapForm';

const LdapDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [ldap, setLdap] = useState<Ldap | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getLdapById = async () => {
      try {
        const result = await LdapService.getLdapByID(id as '');
        setLdap(result);
      } catch (err) {
        setError('Erro ao carregar os dados do usuário.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getLdapById();
  }, [id]);

  const handleSave = async (updateLdap: Ldap) => {
    try {
      await LdapService.updateLdap(updateLdap); // Atualize o método no seu UserService
      setLdap(updateLdap); // Atualiza o estado com os novos dados
      alert('Ldap atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar ldap:', error);
      alert('Erro ao atualizar ldap.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Detalhes do Ldap</h1>
      {ldap ? (
        <LdapForm ldapData={ldap} onSave={handleSave} />
      ) : (
        <p>Usuário não encontrado.</p>
      )}
    </div>
  );
};

export default LdapDetails;