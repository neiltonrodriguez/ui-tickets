const ErrorModal = ({ errorMessage, onClose }: { errorMessage: string | null, onClose: () => void }) => {
    if (!errorMessage) return null;  // Não exibe o modal se não houver mensagem de erro
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
          <h2 className="text-xl font-semibold text-red-600 mb-4">Erro</h2>
          <p className="text-gray-700 mb-4">{errorMessage}</p>
          <div className="flex justify-end">
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    );
  };
 export default ErrorModal  