import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar";


export const Dashboard = () => {
  return (
    <div className="bg-slate-100 h-screen">
      <NavBar />
      <div className="w-full max-w-7xl m-auto mt-10 p-3">
        <div className="bg-white rounded-lg h-96 p-2">
        <Outlet />
        </div>
      
      </div>
    </div>
  );
}
