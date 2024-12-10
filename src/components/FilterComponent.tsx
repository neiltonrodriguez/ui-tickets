import React, { useState, useEffect } from 'react';
import { FilterState } from '../types';
import { TicketService } from '../services/api/ticket/TicketService';
import debounce from 'lodash/debounce';

type FilterProps = {
    onFilter: (filters: FilterState) => void;
};

type FilterOption = {
    [key: string]: string;
};

const FilterComponent: React.FC<FilterProps> = ({ onFilter }) => {
    const [filters, setFilters] = useState<FilterState>({
        request_user: '',
        responsability: '',
        problem_type: '',
        problem_sub_type: '',
    });

    const [subCategoryOptions, setSubCategoryOptions] = useState<FilterOption[]>([]);
    const [filteredSubCategory, setFilteredSubCategory] = useState<FilterOption[]>([]);
    const [categoryOptions, setCategoryOptions] = useState<FilterOption[]>([]);
    const [filteredCategory, setFilteredCategory] = useState<FilterOption[]>([]);
    const [requestUserOptions, setRequestUserOptions] = useState<FilterOption[]>([]);
    const [filteredRequestUser, setFilteredRequestUser] = useState<FilterOption[]>([]);
    const [attendantUserOptions, setAttendantUserOptions] = useState<FilterOption[]>([]);
    const [filteredAttendantUser, setFilteredAttendantUser] = useState<FilterOption[]>([]);

    const [isSubCategoryDropdownVisible, setIsSubCategoryDropdownVisible] = useState(false);
    const [isCategoryDropdownVisible, setIsCategoryDropdownVisible] = useState(false);
    const [isRequestUserDropdownVisible, setIsRequestUserDropdownVisible] = useState(false);
    const [isAttendantUserDropdownVisible, setIsAttendantUserDropdownVisible] = useState(false);

    const [loading, setLoading] = useState(false);
    const [isAttendant, setIsAttendant] = useState(false);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const user = JSON.parse(userData);
            setIsAttendant(user && user.attendant);
        }
    }, []);

    const getCategory = async (value: string) => {
        if (!value) return;
        setLoading(true);
        try {
            const data = await TicketService.getCategory(value);
            setCategoryOptions(data.results || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getSubCategory = async (endpoint: string, search: string) => {
        if (!endpoint && !search) return;
        setLoading(true);
        try {
            const data = await TicketService.getSubCategory(endpoint, search);
            setSubCategoryOptions(data.results || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getRequestUser = async (value: string) => {
        if (!value) return;
        setLoading(true);
        try {
            const data = await TicketService.getRequestUser(value);
            setRequestUserOptions(data.results || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getAttendantUser = async (value: string) => {
        if (!value) return;
        setLoading(true);
        try {
            const data = await TicketService.getAttendantUser(value);
            setAttendantUserOptions(data.results || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const debouncedSearch = debounce((name: string, value: string) => {
        if (name === 'request_user') {
            getRequestUser(value);
        } else if (name === 'responsability') {
            getAttendantUser(value);
        } else if (name === 'problem_type') {
            getCategory(value);
        } else if (name === 'problem_sub_type') {
            console.log('dddddd', value)
            getSubCategory('', value);
        }
    }, 500);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFilters((prevState) => ({ ...prevState, [name]: value }));

        if (value) {
            if (name === 'request_user') {
                const filtered = requestUserOptions.filter((user) =>
                    user.login_user.toLowerCase().includes(value.toLowerCase())
                );
                if (filtered.length === 0) {
                    debouncedSearch(name, value);
                } else {
                    setFilteredRequestUser(filtered);
                }
                setIsRequestUserDropdownVisible(true);
            } else if (name === 'responsability') {
                const filtered = attendantUserOptions.filter((resp) =>
                    resp.login_user.toLowerCase().includes(value.toLowerCase())
                );
                if (filtered.length === 0) {
                    debouncedSearch(name, value);
                } else {
                    setFilteredAttendantUser(filtered);
                }
                setIsAttendantUserDropdownVisible(true);
            } else if (name === 'problem_type') {
                const filtered = categoryOptions.filter((user) =>
                    user.problem_type.toLowerCase().includes(value.toLowerCase())
                );
                if (filtered.length === 0) {
                    debouncedSearch(name, value);
                } else {
                    setFilteredCategory(filtered);
                }
                setIsCategoryDropdownVisible(true);
            } else if (name === 'problem_sub_type') {
                const filtered = subCategoryOptions.filter((user) =>
                    user.problem_sub_type.toLowerCase().includes(value.toLowerCase())
                );
                if (filtered.length === 0) {
                    debouncedSearch(name, value);
                } else {
                    setFilteredSubCategory(filtered);
                }
                setIsSubCategoryDropdownVisible(true);
            }
        } else {
            if (name === 'request_user') {
                setFilteredRequestUser([]);
                setIsRequestUserDropdownVisible(false);
            } else if (name === 'responsability') {
                setFilteredAttendantUser([]);
                setIsAttendantUserDropdownVisible(false);
            } else if (name === 'problem_type') {
                setFilteredCategory([]);
                setIsCategoryDropdownVisible(false);
            } else if (name === 'problem_sub_type') {
                setFilteredSubCategory([]);
                setIsSubCategoryDropdownVisible(false);
            }
        }
    };

    const handleSuggestionClick = (user: FilterOption, field: string) => {
        setFilters((prevState) => ({
            ...prevState,
            [field]: user[field], // Aqui, o valor do filtro será atribuído dinamicamente com base no nome do campo
        }));

        // Limpar os dados e esconder o dropdown conforme o campo
        if (field === 'request_user') {
            setFilteredRequestUser([]); // Limpar sugestões de 'request_user'
            setIsRequestUserDropdownVisible(false); // Fechar o dropdown de 'request_user'
        } else if (field === 'responsability') {
            setFilteredAttendantUser([]); // Limpar sugestões de 'responsability'
            setIsAttendantUserDropdownVisible(false); // Fechar o dropdown de 'responsability'
        } else if (field === 'problem_type') {
            getSubCategory('', user.problem_type);
            setFilteredCategory([]); // Limpar sugestões de 'problem_type'
            setIsCategoryDropdownVisible(false); // Fechar o dropdown de 'problem_type'
        } else if (field === 'problem_sub_type') {
            setFilteredSubCategory([]); // Limpar sugestões de 'problem_type'
            setIsSubCategoryDropdownVisible(false); // Fechar o dropdown de 'problem_type'
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onFilter(filters);
    };

    const handleClearFilters = () => {
        setFilters({
            request_user: '',
            responsability: '',
            problem_type: '',
            problem_sub_type: '',
        });
        setFilteredRequestUser([]);
        setFilteredAttendantUser([]);
        setFilteredCategory([]);
        setIsRequestUserDropdownVisible(false);
        setIsAttendantUserDropdownVisible(false);
        setIsCategoryDropdownVisible(false);
        onFilter(filters);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-4 gap-3 container m-auto">
                {/* Usuário Solicitante */}
                {isAttendant && (<div className="relative">
                    <label>Usuário Solicitante:</label>
                    <input
                        type="text"
                        name="request_user"
                        value={filters.request_user}
                        onChange={handleInputChange}
                        className="border p-2 rounded-md w-full"
                    />

                    {isRequestUserDropdownVisible && !loading && filteredRequestUser.length > 0 && (
                        <ul className="absolute bg-white border border-gray-300 max-h-60 overflow-auto z-10">
                            {filteredRequestUser.map((user) => (
                                <li
                                    key={user.login_user}
                                    className="p-2 hover:bg-gray-200 cursor-pointer"
                                    onClick={() => handleSuggestionClick(user, 'request_user')}
                                >
                                    {user.complete_user_name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                )}

                {/* Responsabilidade */}
                <div className="relative">
                    <label>Responsabilidade:</label>
                    <input
                        type="text"
                        name="responsability"
                        value={filters.responsability}
                        onChange={handleInputChange}
                        className="border p-2 rounded-md w-full"
                    />

                    {isAttendantUserDropdownVisible && !loading && filteredAttendantUser.length > 0 && (
                        <ul className="absolute bg-white border border-gray-300 max-h-60 overflow-auto z-10">
                            {filteredAttendantUser.map((resp) => (
                                <li
                                    key={resp.login_user}
                                    className="p-2 hover:bg-gray-200 cursor-pointer"
                                    onClick={() => handleSuggestionClick(resp, 'responsability')}
                                >
                                    {resp.complete_user_name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Categoria */}
                <div className="relative">
                    <label>Categoria:</label>
                    <input
                        type="text"
                        name="problem_type"
                        value={filters.problem_type}
                        onChange={handleInputChange}
                        className="border p-2 rounded-md w-full"
                    />

                    {isCategoryDropdownVisible && !loading && filteredCategory.length > 0 && (
                        <ul className="absolute bg-white border border-gray-300 max-h-60 overflow-auto z-10">
                            {filteredCategory.map((cat) => (
                                <li
                                    key={cat.problem_type}
                                    className="p-2 hover:bg-gray-200 cursor-pointer"
                                    onClick={() => handleSuggestionClick(cat, 'problem_type')}
                                >
                                    {cat.problem_type}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Categoria */}
                <div className="relative">
                    <label>Sub Categoria:</label>
                    <input
                        type="text"
                        name="problem_sub_type"
                        value={filters.problem_sub_type}
                        onChange={handleInputChange}
                        className="border p-2 rounded-md w-full"
                    />

                    {isSubCategoryDropdownVisible && !loading && filteredSubCategory.length > 0 && (
                        <ul className="absolute bg-white border border-gray-300 max-h-60 overflow-auto z-10">
                            {filteredSubCategory.map((sub) => (
                                <li
                                    key={sub.problem_sub_type}
                                    className="p-2 hover:bg-gray-200 cursor-pointer"
                                    onClick={() => handleSuggestionClick(sub, 'problem_sub_type')}
                                >
                                    {sub.problem_sub_type}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex items-center justify-end mt-3">
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
                    Pesquisar
                </button>

                <button
                    type="button"
                    onClick={handleClearFilters}
                    className="ml-2 bg-gray-500 text-white p-2 rounded-md"
                >
                    Limpar Filtros
                </button>
            </div>
        </form>
    );
};

export default FilterComponent;
