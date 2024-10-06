import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LdapService } from '../../services/api/ldap/LdapService';
import { Ldap } from '../../types';
import LdapForm from '../../components/LdapForm';


const LdapDetails = () => {
  const { id, mode } = useParams<{ id: string, mode: string }>();
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

    if (mode === 'edit') {
      getLdapById();
    } else {
      setLoading(false);
    }
  }, [id, mode]);

 

  const handleSave = async (updatedLdap: Ldap) => {
    if (mode === 'new') {
      try {
        await LdapService.createLdap(updatedLdap);
        // alert('Ldap criado com sucesso!');
        return;
      } catch (error) {
        // alert('Erro ao criar ldap.');
        return;
      }

    } else if (mode === 'edit') {
      try {
        await LdapService.updateLdap(updatedLdap); 
        setLdap(updatedLdap); 
        // alert('ldap atualizado com sucesso!');
      } catch (error) {
        // alert('Erro ao atualizar ldap.');
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (

    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Detalhes do Ldap</h1>
      
      {ldap && mode != 'new' ? (
        <LdapForm ldapData={ldap} onSave={handleSave} isEditMode={true} />
      ) : (
        <LdapForm ldapData={ldap} onSave={handleSave} isEditMode={false} />
      )}
    </div>
  );
};

export default LdapDetails;