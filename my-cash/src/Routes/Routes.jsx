import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home";
import Signup from "../Pages/Signup/Signup";
import Signin from "../Pages/SignIn/SignIn";
import Dashboard from "../Layouts/Dashboard";
import Manageusers from "../Pages/Dashboard/Admin/Manageusers";
import Balance from "../Pages/Dashboard/User/Balance";
import Cashin from "../Pages/Dashboard/User/Cashin";
import Transaction from "../Pages/Dashboard/Agent/Transaction";
import Cashout from "../Pages/Dashboard/User/Cashout";
import TransitionHistory from "../Pages/Dashboard/Agent/TransitionHistory";
import TransactionHistoru from "../Pages/Dashboard/User/TransactionHistoru";
import SendMoney from "../Pages/Dashboard/User/SendMoney";




export const router =createBrowserRouter([
   { path:"/",
     element:<Main></Main>,
     children:[
        {
         path:"/",
         element:<Home></Home>
        },
        {
         path:"/signup",
         element:<Signup></Signup>
        },
        {
         path:"/signin",
         element:<Signin></Signin>
        },
       
     ]
   
 
   }
   ,
   {
      path:"/dashboard",
      element:<Dashboard></Dashboard>,
      children:[
       {
          path:"/dashboard"
       },

      //  admin 
       {
         path:"/dashboard/manageusers",
         element:<Manageusers></Manageusers>
       },
      //  agent
      
      {
         path:"/dashboard/transaction",
         element:<Transaction></Transaction>
      },
      {
         path:"/dashboard/transactionhistory",
         element:<TransitionHistory></TransitionHistory>
      },

      // normal

      {
         path:"/dashboard/balance",
         element:<Balance></Balance>
      },
      {
         path:"/dashboard/cashin",
         element:<Cashin></Cashin>
      },
      {
         path:"/dashboard/cashout",
         element:<Cashout></Cashout>
      },
      {
         path:"/dashboard/transaction-history",
         element:<TransactionHistoru></TransactionHistoru>
      },
      {
         path:"/dashboard/sendmoney",
         element:<SendMoney></SendMoney>
      },
      ]
   }
])