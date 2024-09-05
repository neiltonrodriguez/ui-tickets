import React, { useState } from 'react';

type FilterProps = {
    onFilter: (filters: FilterState) => void; // Função de callback para passar os filtros
};

type FilterState = {
    startDate: string;
    endDate: string;
    usuarioSolicitante: string;
    atendente: string;
    status: string;
    categoria: string;
    subCategoria: string;
    numeroChamado: string;
};

const FilterComponent: React.FC<FilterProps> = ({ onFilter }) => {
    const [filters, setFilters] = useState<FilterState>({
        startDate: '',
        endDate: '',
        usuarioSolicitante: '',
        atendente: '',
        status: '',
        categoria: '',
        subCategoria: '',
        numeroChamado: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onFilter(filters);  // Chama a função de callback para passar os filtros
    };

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-3 container m-auto py-2">
            {/* Range de Data */}
            <div>
                <label>Data de Início:</label>
                <input 
                    type="date" 
                    name="startDate" 
                    value={filters.startDate} 
                    onChange={handleInputChange} 
                    className="border p-2 rounded-md w-full" 
                />
            </div>
            <div>
                <label>Data de Fim:</label>
                <input 
                    type="date" 
                    name="endDate" 
                    value={filters.endDate} 
                    onChange={handleInputChange} 
                    className="border p-2 rounded-md w-full" 
                />
            </div>

            {/* Usuário Solicitante */}
            <div>
                <label>Usuário Solicitante:</label>
                <input 
                    type="text" 
                    name="usuarioSolicitante" 
                    value={filters.usuarioSolicitante} 
                    onChange={handleInputChange} 
                    className="border p-2 rounded-md w-full" 
                />
            </div>

            {/* Atendente */}
            <div>
                <label>Atendente:</label>
                <input 
                    type="text" 
                    name="atendente" 
                    value={filters.atendente} 
                    onChange={handleInputChange} 
                    className="border p-2 rounded-md w-full" 
                />
            </div>

            {/* Status */}
            <div>
                <label>Status:</label>
                <select 
                    name="status" 
                    value={filters.status} 
                    onChange={handleInputChange} 
                    className="border p-2 rounded-md w-full"
                >
                    <option value="">Selecione</option>
                    <option value="aberto">Aberto</option>
                    <option value="fechado">Fechado</option>
                    <option value="em_andamento">Em Andamento</option>
                </select>
            </div>

            {/* Categoria */}
            <div>
                <label>Categoria:</label>
                <input 
                    type="text" 
                    name="categoria" 
                    value={filters.categoria} 
                    onChange={handleInputChange} 
                    className="border p-2 rounded-md w-full" 
                />
            </div>

            {/* Sub-categoria */}
            <div>
                <label>Sub-categoria:</label>
                <input 
                    type="text" 
                    name="subCategoria" 
                    value={filters.subCategoria} 
                    onChange={handleInputChange} 
                    className="border p-2 rounded-md w-full" 
                />
            </div>

            {/* Número do Chamado */}
            <div>
                <label>Número do Chamado:</label>
                <input 
                    type="text" 
                    name="numeroChamado" 
                    value={filters.numeroChamado} 
                    onChange={handleInputChange} 
                    className="border p-2 rounded-md w-full" 
                />
            </div>

            {/* Botão de Filtro */}
            <div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full">
                    Aplicar Filtros
                </button>
            </div>
        </form>
    );
};

export default FilterComponent;
