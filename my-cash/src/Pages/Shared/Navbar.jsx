import { Link, NavLink } from "react-router-dom";
import UseAuth from "../../Hooks/UseAuth";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {

  const name = localStorage.getItem("user")
  const {logOut}=UseAuth()

  const handleLogOut=()=>{
    logOut()
  }
    return (
      <div className="bg-[#D5C4A1] shadow-xl  rounded-full">
          <div className="navbar   ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-[#D5C4A1] rounded-box z-[1] mt-3  shadow flex-col justify-center items-center font-semibold w-44  ">
               <NavLink to={'/gg'} className={({isActive,isPending})=>
        isPending ? 'text-[#91391e]' : isActive ? 'text-[#f76133]' :'text-[#d0481e] hover:bg-[#E6D8CF] px-3 py-2 rounded-lg transition-all duration-300 delay-100' } >Contact Us</NavLink>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">MyCash</a>
        </div>
        <div className="navbar-center hidden lg:flex justify-center items-center">
          <ul className="menu menu-horizontal  px-1 space-x-4 text-lg font-semibold  flex justify-center items-center">
          <NavLink to={'/'} className={({isActive,isPending})=>
        isPending ? 'text-[#3C3C3C]' : isActive ? 'text-[#f76133]' :'text-[#3C3C3C] hover:bg-[#E6D8CF] px-3 py-2 rounded-lg transition-all duration-300 delay-100' } >Home</NavLink>
          <NavLink to={'/signup'} className={({isActive,isPending})=>
        isPending ? 'text-[#3C3C3C]' : isActive ? 'text-[#f76133]' :'text-[#3C3C3C] hover:bg-[#E6D8CF] px-3 py-2 rounded-lg transition-all duration-300 delay-100' } >Account</NavLink>
          </ul>
        </div>
    <div className="navbar-end">

      {
        name ?   <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
          <CgProfile className="h-10 w-10" />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li>
            <a className="justify-between">
              Profile
              <span className="badge">New</span>
            </a>
          </li>
          <li><a>Settings</a></li>
          <Link to={"/dashboard"}><a>Dashboard</a></Link>
          <li onClick={handleLogOut}><a>Logout</a></li>
        </ul>
      </div> :  <Link className="text-xl font-semibold" to={'/signin'}>Login</Link>
      }
          
        </div> 


      </div>
      </div>
      
    );
};

export default Navbar;