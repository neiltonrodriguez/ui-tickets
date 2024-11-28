import React from 'react';

type ModalPermissaoProps = {
  show: boolean;
  onClose: () => void;
};

const ModalPermissao: React.FC<ModalPermissaoProps> = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '5px',
        zIndex: 1000,
      }}
    >
      <h3>Permissão Negada</h3>
      <p>Você não tem permissão para executar esta ação.</p>
      <button onClick={onClose}>Fechar</button>
    </div>
  );
};

export default ModalPermissao;
