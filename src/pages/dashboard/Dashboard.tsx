import { Outlet } from "react-router-dom";
import { useState } from "react";
import NavBar from "../../components/NavBar";
import FilterComponent from "../../components/FilterComponent";


export const Dashboard = () => {
  const [filteredData, setFilteredData] = useState([]);

    const handleFilter = (filters: any) => {
        console.log(filters);  // Aqui você pode aplicar os filtros aos seus dados
        setFilteredData(filters);
    };
  return (
    <div className="bg-slate-100 h-full">
      <NavBar />
      <div className="w-full  m-auto mt-10 p-3">
        <FilterComponent onFilter={handleFilter} />
        <div className="bg-white rounded-lg h-full p-2">
        <Outlet />
        </div>
        
      
      </div>
    </div>
  );
}
