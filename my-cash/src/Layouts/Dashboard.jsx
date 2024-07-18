import { Outlet } from "react-router-dom";
import Sidebar from "../Pages/Dashboard/Sidebar/Sidebar";


const Dashboard = () => {
    return (
        <div className='relative bg-[#D5C4A1] min-h-screen md:flex'>
        {/* Sidebar */}
      <Sidebar></Sidebar>
  
        {/* Outlet --> Dynamic content */}
        <div className='flex-1 md:ml-64'>
          <div className='p-5'>
            <Outlet />
          </div>
        </div>
      </div>
    );
};

export default Dashboard;