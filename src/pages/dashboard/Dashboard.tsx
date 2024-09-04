import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar";


export const Dashboard = () => {
  return (
    <div className="bg-slate-100 h-full">
      <NavBar />
      <div className="w-full  m-auto mt-10 p-3">
        <div className="bg-white rounded-lg h-full p-2">
        <Outlet />
        </div>
      
      </div>
    </div>
  );
}
