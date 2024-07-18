import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineBars } from "react-icons/ai";
import logo from "../../../../public/logo.png";
import { IoMdLogOut } from "react-icons/io";
import UseAuth from "../../../Hooks/UseAuth";
import UserRoll from "../../../Hooks/UseRoll";

const Sidebar = () => {
  const { logOut } = UseAuth();
  const [isActive, setActive] = useState(false);
  const [roll] = UserRoll();
  const userroll = roll[0];
  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-[#D5C4A1] shadow-xl  text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link
              className="flex justify-center gap-2 items-center mx-auto"
              to="/"
            >
              <img
                // className='hidden md:block'
                src={logo}
                alt="logo"
                width="100"
                className="h-10 w-10"
                height="100"
              />{" "}
              <span className="text-2xl text-white">MyCash</span>
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-rose-50"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-[#D5C4A1] shadow-xl w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-[#D5C4A1]  mx-auto">
              <Link
                className="flex justify-center gap-2 items-center mx-auto"
                to="/"
              >
                <img
                  // className='hidden md:block'
                  src={logo}
                  alt="logo"
                  width="100"
                  className="h-10 w-10"
                  height="100"
                />{" "}
                <span className="text-3xl text-white">MyCash</span>
              </Link>
            </div>
          </div>

          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav className="text-xl flex-col space-y-4 mx-auto">
              {/* dashboard routes */}

              <NavLink
                className={({ isActive, isPending }) =>
                  isPending
                    ? "text-black hover:bg-slate-200 "
                    : isActive
                    ? "text-rose-300  underline"
                    : "text-black hover:bg-slate-200"
                }
                to={"/dashboard"}
              >
                {" "}
                <p className="flex items-center gap-2">
                  <span></span> <span>Profile</span>
                </p>{" "}
              </NavLink>
                 {/*admin routes  */}
              {userroll === "admin" ? (
                <div className="flex flex-col space-y-2">
                  <NavLink
                    to={"/dashboard/manageusers"}
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "text-[#3C3C3C]"
                        : isActive
                        ? "text-[#f76133]"
                        : "text-[#3C3C3C] hover:bg-[#E6D8CF] px-3 py-2 rounded-lg transition-all duration-300 delay-100"
                    }
                  >
                    ManageUsers
                  </NavLink>
                </div>
              ) : userroll === "agent" ?  (
                //    Agent users routes
                <div className="flex flex-col space-y-3">
                  <NavLink
                    to={"/dashboard/transaction"}
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "text-[#3C3C3C]"
                        : isActive
                        ? "text-[#f76133]"
                        : "text-[#3C3C3C] hover:bg-[#E6D8CF] px-1 py-2 rounded-lg transition-all duration-300 delay-100"
                    }
                  >
                    Transaction Management
                  </NavLink>
                  <NavLink
                    to={"/dashboard/transactionhistory"}
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "text-[#3C3C3C]"
                        : isActive
                        ? "text-[#f76133]"
                        : "text-[#3C3C3C] hover:bg-[#E6D8CF] px-1 py-2 rounded-lg transition-all duration-300 delay-100"
                    }
                  >
                    TransitionHistory
                  </NavLink>
                </div>
              ) :  
              // normal user 
              
              <div className="flex flex-col space-y-3">
              <NavLink
                to={"/dashboard/balance"}
                className={({ isActive, isPending }) =>
                  isPending
                    ? "text-[#3C3C3C]"
                    : isActive
                    ? "text-[#f76133]"
                    : "text-[#3C3C3C] hover:bg-[#E6D8CF] px-3 py-2 rounded-lg transition-all duration-300 delay-100"
                }
              >
                Balance Inquiry
              </NavLink>
              <NavLink
                to={"/dashboard/transaction-history"}
                className={({ isActive, isPending }) =>
                  isPending
                    ? "text-[#3C3C3C]"
                    : isActive
                    ? "text-[#f76133]"
                    : "text-[#3C3C3C] hover:bg-[#E6D8CF] px-3 py-2 rounded-lg transition-all duration-300 delay-100"
                }
              >
                Transaction History
              </NavLink>
              <NavLink
                to={"/dashboard/sendmoney"}
                className={({ isActive, isPending }) =>
                  isPending
                    ? "text-[#3C3C3C]"
                    : isActive
                    ? "text-[#f76133]"
                    : "text-[#3C3C3C] hover:bg-[#E6D8CF] px-3 py-2 rounded-lg transition-all duration-300 delay-100"
                }
              >
               Send Money
              </NavLink>
              <NavLink
                to={"/dashboard/cashin"}
                className={({ isActive, isPending }) =>
                  isPending
                    ? "text-[#3C3C3C]"
                    : isActive
                    ? "text-[#f76133]"
                    : "text-[#3C3C3C] hover:bg-[#E6D8CF] px-3 py-2 rounded-lg transition-all duration-300 delay-100"
                }
              >
               Cashin
              </NavLink>
              <NavLink
                to={"/dashboard/cashout"}
                className={({ isActive, isPending }) =>
                  isPending
                    ? "text-[#3C3C3C]"
                    : isActive
                    ? "text-[#f76133]"
                    : "text-[#3C3C3C] hover:bg-[#E6D8CF] px-3 py-2 rounded-lg transition-all duration-300 delay-100"
                }
              >
               Cashout
              </NavLink>
            </div>}
            </nav>
          </div>
        </div>

        <div>
          <hr />

          {/* Profile Menu */}

          <button
            onClick={logOut}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-rose-300   hover:text-gray-700 transition-colors duration-300 transform"
          >
            <IoMdLogOut className="h-5 w-5" />

            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
