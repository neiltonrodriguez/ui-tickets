import React, { useState, useEffect } from 'react';
import { FilterState } from '../types';
import { TicketService } from '../services/api/ticket/TicketService';
import debounce from 'lodash/debounce';
import { FaChevronDown } from 'react-icons/fa';

type FilterProps = {
    onFilter: (filters: FilterState) => void;
    initialFilters: FilterState;
};

type FilterOption = {
    [key: string]: string;
};

const FilterComponent: React.FC<FilterProps> = ({ onFilter, initialFilters }) => {
    const [filters, setFilters] = useState<FilterState>(initialFilters);

    const [thirdCategoryOptions, setThirdCategoryOptions] = useState<FilterOption[]>([]);
    const [filteredThirdCategory, setFilteredThirdCategory] = useState<FilterOption[]>([]);
    const [assignedGroupOptions, setAssignedGroupOptions] = useState<FilterOption[]>([]);
    const [filteredAssignedGroup, setFilteredAssignedGroup] = useState<FilterOption[]>([]);
    const [subCategoryOptions, setSubCategoryOptions] = useState<FilterOption[]>([]);
    const [filteredSubCategory, setFilteredSubCategory] = useState<FilterOption[]>([]);
    const [categoryOptions, setCategoryOptions] = useState<FilterOption[]>([]);
    const [filteredCategory, setFilteredCategory] = useState<FilterOption[]>([]);
    const [requestUserOptions, setRequestUserOptions] = useState<FilterOption[]>([]);
    const [filteredRequestUser, setFilteredRequestUser] = useState<FilterOption[]>([]);
    const [attendantUserOptions, setAttendantUserOptions] = useState<FilterOption[]>([]);
    const [filteredAttendantUser, setFilteredAttendantUser] = useState<FilterOption[]>([]);

    const [isThirdCategoryDropdownVisible, setIsThirdCategoryDropdownVisible] = useState(false);
    const [isAssignedGroupDropdownVisible, setIsAssignedGroupDropdownVisible] = useState(false);
    const [isSubCategoryDropdownVisible, setIsSubCategoryDropdownVisible] = useState(false);
    const [isCategoryDropdownVisible, setIsCategoryDropdownVisible] = useState(false);
    const [isRequestUserDropdownVisible, setIsRequestUserDropdownVisible] = useState(false);
    const [isAttendantUserDropdownVisible, setIsAttendantUserDropdownVisible] = useState(false);

    const [loading, setLoading] = useState(false);
    const [isAttendant, setIsAttendant] = useState(false);

    useEffect(() => {
        setFilters(initialFilters);
    }, [initialFilters]);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const user = JSON.parse(userData);
            setIsAttendant(user && user.attendant);
        }
    }, []);

    useEffect(() => {
        getRequestUser('');
        getAttendantUser('');
        getCategory('');
        getAssignedGroup('');
    }, [])

    const getCategory = async (value: string) => {
        // if (!value) return;
        setLoading(true);
        try {
            const data = await TicketService.getCategory(value);
            setCategoryOptions(data.results || []);
            setFilteredCategory(data.results || [])
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
            setFilteredSubCategory(data.results || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getThirdLevelCategory = async (endpoint: string, search: string) => {
        if (!endpoint && !search) return;
        setLoading(true);
        try {
            const data = await TicketService.getThirdCategory(endpoint, search);
            setThirdCategoryOptions(data.results || []);
            setFilteredThirdCategory(data.results || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getRequestUser = async (value: string) => {
        setLoading(true);
        try {
            const data = await TicketService.getRequestUser(value);
            setRequestUserOptions(data.results || []);
            setFilteredRequestUser(data.results || [])
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getAttendantUser = async (value: string) => {
        setLoading(true);
        try {
            const data = await TicketService.getAttendantUser(value);
            setAttendantUserOptions(data.results || []);
            setFilteredAttendantUser(data.results || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getAssignedGroup = async (value: string) => {
        setLoading(true);
        try {
            const data = await TicketService.getAssignedGroup(value);
            setAssignedGroupOptions(data.results || []);
            setFilteredAssignedGroup(data.results || [])
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
            getSubCategory('', value);
        } else if (name === 'assigned_group') {
            getAssignedGroup(value);
        } else if (name === 'third_level_category') {
            getThirdLevelCategory('', value);
        }
    }, 500);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFilters((prevState) => ({
            ...prevState,
            [name]: value,
            [`${name}_display`]: '',
        }));

        if (value) {
            if (name === 'request_user') {
                console.log('input request_user', e.target)
                const filtered = requestUserOptions.filter((user) =>
                    user.username.toLowerCase().includes(value.toLowerCase())
                );
                if (filtered.length === 0) {
                    debouncedSearch(name, value);
                } else {
                    setFilteredRequestUser(filtered);
                }
                setIsRequestUserDropdownVisible(true);
            } else if (name === 'responsability') {
                
                const filtered = attendantUserOptions.filter((resp) =>
                    resp.username.toLowerCase().includes(value.toLowerCase())
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
            } else if (name === 'assigned_group') {
                const filtered = assignedGroupOptions.filter((user) =>
                    user.assigned_group.toLowerCase().includes(value.toLowerCase())
                );
                if (filtered.length === 0) {
                    debouncedSearch(name, value);
                } else {
                    setFilteredAssignedGroup(filtered);
                }
                setIsAssignedGroupDropdownVisible(true);
            } else if (name === 'third_level_category') {
                const filtered = thirdCategoryOptions.filter((user) =>
                    user.third_level_category.toLowerCase().includes(value.toLowerCase())
                );
                if (filtered.length === 0) {
                    debouncedSearch(name, value);
                } else {
                    setFilteredThirdCategory(filtered);
                }
                setIsThirdCategoryDropdownVisible(true);
            } else if (name === 'insert_time_start') {
                const inputValue = name === 'insert_time_start' ? value : '';
                setFilters((prevState) => ({
                    ...prevState,
                    insert_time_start: inputValue, 
                }));
            } else if (name === 'insert_time_end') {
                const inputValue = name === 'insert_time_end' ? value : '';
                setFilters((prevState) => ({
                    ...prevState,
                    insert_time_end: inputValue, 
                }));
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
            } else if (name === 'assigned_group') {
                setFilteredAssignedGroup([]);
                setIsAssignedGroupDropdownVisible(false);
            } else if (name === 'third_level_category') {
                setFilteredThirdCategory([]);
                setIsThirdCategoryDropdownVisible(false);
            }
        }
    };

    const handleSuggestionClick = (user: FilterOption, field: string) => {
        let inputValue = '';
        if (field === 'request_user') {
            inputValue = field === 'request_user' ? user.username : user[field];
            setFilters((prevState) => ({
                ...prevState,
                [field]: inputValue, 
                [`${field}_display`]: user.complete_user_name,
            }));
        } else if (field === 'responsability') {
            inputValue = field === 'responsability' ? user.username : user[field];
            setFilters((prevState) => ({
                ...prevState,
                [field]: inputValue, 
                [`${field}_display`]: user.complete_user_name,
            }));
        } else if (field === 'problem_type') {
            inputValue = field === 'problem_type' ? user.problem_type : user[field];
            setFilters((prevState) => ({
                ...prevState,
                [field]: inputValue, 
            }));
            getSubCategory(user.problem_type, '');
        } else if (field === 'problem_sub_type') {
            inputValue = field === 'problem_sub_type' ? user.problem_sub_type : user[field];
            setFilters((prevState) => ({
                ...prevState,
                [field]: inputValue, 
            }));
            getThirdLevelCategory(user.problem_sub_type, '');
        } else if (field === 'assigned_group') {
            inputValue = field === 'assigned_group' ? user.group_name : user[field];
            setFilters((prevState) => ({
                ...prevState,
                [field]: inputValue, 
            }));

        } else if (field === 'third_level_category') {
            inputValue = field === 'third_level_category' ? user.third_level_category : user[field];
            setFilters((prevState) => ({
                ...prevState,
                [field]: inputValue, 
            }));

        }

    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onFilter(filters);

    };

    const handleClearFilters = () => {
        setFilters({
            request_user: '',
            request_user_display: '',
            responsability: '',
            responsability_display: '',
            problem_type: '',
            problem_sub_type: '',
            assigned_group: '',
            third_level_category: '',
            insert_time_start: '',
            insert_time_end: '',
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
                {/* Data de Início */}
                <div className="relative">
                    <label htmlFor="insert_time_start" className="cursor-pointer">
                        <label>Data de Início:</label>
                        <input
                            id="insert_time_start"
                            type="date"
                            name="insert_time_start"
                            value={filters.insert_time_start}
                            onChange={handleInputChange}
                            className="border p-2 rounded-md w-full"
                        />
                    </label>
                </div>

                {/* Data de Fim */}
                <div className="relative">
                    <label htmlFor="insert_time_end" className="cursor-pointer">
                        <label>Data de Fim:</label>
                        <input
                            id="insert_time_end"
                            type="date"
                            name="insert_time_end"
                            value={filters.insert_time_end}
                            onChange={handleInputChange}
                            className="border p-2 rounded-md w-full"
                        />
                    </label>
                </div>
                {/* Usuário Solicitante */}
                {isAttendant && (
                    <div className="relative">
                        <label htmlFor="request_user" className="cursor-pointer">
                            <label>Usuário Solicitante:</label>

                            {/* Input para pesquisar dentro do array */}
                            <input
                                id="request_user"
                                type="text"
                                name="request_user"
                                value={filters.request_user_display || filters.request_user}
                                onChange={handleInputChange} 
                                onFocus={() => setIsRequestUserDropdownVisible(true)}
                                onBlur={() => setTimeout(() => setIsRequestUserDropdownVisible(false), 200)}  // 
                                className="border p-2 rounded-md w-full"
                                placeholder="Pesquise por nome..."
                            />
                            <FaChevronDown
                                className="absolute top-1/2 right-1 mt-3 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                        </label>

                        {/* Dropdown com sugestões filtradas */}
                        {isRequestUserDropdownVisible && !loading && (
                            <ul className="absolute bg-white border border-gray-300 max-h-60 overflow-auto z-10 w-full">
                                {filteredRequestUser.length > 0 ? (
                                    filteredRequestUser.map((user) => (
                                        <li
                                            key={user.username}
                                            className="p-2 hover:bg-gray-200 cursor-pointer"
                                            onClick={() => handleSuggestionClick(user, 'request_user')}  // Função de seleção
                                        >
                                            {user.complete_user_name}
                                        </li>
                                    ))
                                ) : (
                                    <li className="p-2 text-gray-500">Nenhum resultado</li>
                                )}
                            </ul>
                           
                        )}
                    </div>
                )}

                {/* Responsabilidade */}
                <div className="relative">
                    <label htmlFor="responsability" className="cursor-pointer">
                        <label>Responsabilidade:</label>
                        <input
                            id="responsability"
                            type="text"
                            name="responsability"
                            value={filters.responsability_display || filters.responsability}
                            onChange={handleInputChange}
                            onFocus={() => setIsAttendantUserDropdownVisible(true)}
                            onBlur={() => setTimeout(() => setIsAttendantUserDropdownVisible(false), 200)}
                            className="border p-2 rounded-md w-full"
                            placeholder="Pesquise por atendente..."
                        />
                        <FaChevronDown
                            className="absolute top-1/2 right-1 mt-3 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                    </label>
                    {isAttendantUserDropdownVisible && !loading && filteredAttendantUser.length > 0 && (
                        <ul className="absolute w-full bg-white border border-gray-300 max-h-60 overflow-auto z-10">
                            {filteredAttendantUser.map((resp) => (
                                <li
                                    key={resp.username}
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
                    <label htmlFor="problem_type" className="cursor-pointer">
                        <label>Categoria:</label>
                        <input
                            id="problem_type"
                            type="text"
                            name="problem_type"
                            value={filters.problem_type}
                            onChange={handleInputChange}
                            onFocus={() => setIsCategoryDropdownVisible(true)}
                            onBlur={() => setTimeout(() => setIsCategoryDropdownVisible(false), 200)}
                            className="border p-2 rounded-md w-full"
                            placeholder="Pesquise por Categoria..."
                        />
                        <FaChevronDown
                            className="absolute top-1/2 right-1 mt-3 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                    </label>
                    {isCategoryDropdownVisible && !loading && filteredCategory.length > 0 && (
                        <ul className="absolute w-full bg-white border border-gray-300 max-h-60 overflow-auto z-10">
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

                {/* Sub Categoria */}
                <div className="relative">
                    <label htmlFor="problem_sub_type" className="cursor-pointer">
                        <label>Sub Categoria:</label>
                        <input
                            id="problem_sub_type"
                            type="text"
                            name="problem_sub_type"
                            value={filters.problem_sub_type}
                            onChange={handleInputChange}
                            onFocus={() => setIsSubCategoryDropdownVisible(true)}  // Abre o dropdown ao clicar no input
                            onBlur={() => setTimeout(() => setIsSubCategoryDropdownVisible(false), 200)}
                            className="border p-2 rounded-md w-full"
                            placeholder="Pesquise por sub-categoria..."
                        />

                        <FaChevronDown
                            className="absolute top-1/2 right-1 mt-3 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                    </label>
                    {isSubCategoryDropdownVisible && !loading && filteredSubCategory.length > 0 && (
                        <ul className="absolute w-full bg-white border border-gray-300 max-h-60 overflow-auto z-10">
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

                {/* Terceira Categoria */}
                <div className="relative">
                    <label htmlFor="third_level_category" className="cursor-pointer">
                        <label>Terceira Categoria:</label>
                        <input
                            id="third_level_category"
                            type="text"
                            name="third_level_category"
                            value={filters.third_level_category}
                            onChange={handleInputChange}
                            onFocus={() => setIsThirdCategoryDropdownVisible(true)}  // Abre o dropdown ao clicar no input
                            onBlur={() => setTimeout(() => setIsThirdCategoryDropdownVisible(false), 200)}
                            className="border p-2 rounded-md w-full"
                            placeholder="Pesquise por terceira categoria..."
                        />

                        <FaChevronDown
                            className="absolute top-1/2 right-1 mt-3 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                    </label>
                    {isThirdCategoryDropdownVisible && !loading && filteredThirdCategory.length > 0 && (
                        <ul className="absolute w-full bg-white border border-gray-300 max-h-60 overflow-auto z-10">
                            {filteredThirdCategory.map((sub) => (
                                <li
                                    key={sub.third_level_category}
                                    className="p-2 hover:bg-gray-200 cursor-pointer"
                                    onClick={() => handleSuggestionClick(sub, 'third_level_category')}
                                >
                                    {sub.third_level_category}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Grupo */}
                <div className="relative">
                    <label htmlFor="assigned_group" className="cursor-pointer">
                        <label>Grupo:</label>
                        <input
                            id="assigned_group"
                            type="text"
                            name="assigned_group"
                            value={filters.assigned_group}
                            onChange={handleInputChange}
                            onFocus={() => setIsAssignedGroupDropdownVisible(true)}  // Abre o dropdown ao clicar no input
                            onBlur={() => setTimeout(() => setIsAssignedGroupDropdownVisible(false), 200)}
                            className="border p-2 rounded-md w-full"
                            placeholder="Pesquise por grupo..."
                        />

                        <FaChevronDown
                            className="absolute top-1/2 right-1 mt-3 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                    </label>
                    {isAssignedGroupDropdownVisible && !loading && filteredAssignedGroup.length > 0 && (
                        <ul className="absolute w-full bg-white border border-gray-300 max-h-60 overflow-auto z-10">
                            {filteredAssignedGroup.map((sub) => (
                                <li
                                    key={sub.group_name}
                                    className="p-2 hover:bg-gray-200 cursor-pointer"
                                    onClick={() => handleSuggestionClick(sub, 'assigned_group')}
                                >
                                    {sub.group_name}
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
