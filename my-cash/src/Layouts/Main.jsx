import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar";


const Main = () => {
    return (
        <div className="bg-[#D5C4A1] p-4 ">
            <div>    <Navbar></Navbar></div>
        
            <Outlet ></Outlet>
        
        </div>
    );
};

export default Main;