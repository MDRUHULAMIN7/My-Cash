import { Link } from "react-router-dom";
import UserRoll from "../../../Hooks/UseRoll";

import img1 from "../../../../public/cashin.jpg";
import img2 from "../../../../public/cashout.jpg";

const Balance = () => {
  const [roll] = UserRoll();
  const balance = roll[2];



  return (
    <div className="h-full">
      <h1 className="mt-10 mx-auto text-center text-3xl ">
        Your Total Balance {balance} taka
      </h1>

      <div className="mt-5 mb-5  md:w-2/3 w-full md:flex justify-center items-center mx-auto space-x-3">
        <Link
          to={"/dashboard/cashin"}   style={{
            backgroundImage: `url(${img1})`,
          }}
          className="bg-cover  rounded-xl hover:border-2  hover:border-teal-300 bg-no-repeat h-64 w-full md:w-1/2 mx-auto"
        >
          <p
          
            className=" text-4xl text-white rounded-xl font-semibold bg-no-repeat bg-cover text-center pt-24 bg-black bg-opacity-40 w-full h-full"
          >
            Cash In
          </p>
        </Link>
        <Link
          to={"/dashboard/cashout"}   style={{
            backgroundImage: `url(${img2})`,
          }}
          className="bg-cover  rounded-xl hover:border-2  hover:border-teal-300 bg-no-repeat h-64 w-full md:w-1/2 mx-auto"
        >
          <p
          
            className=" text-4xl text-white rounded-xl font-semibold bg-no-repeat bg-cover text-center pt-24 bg-black bg-opacity-40 w-full h-full"
          >
            Cash Out
          </p>
        </Link>

        
      </div>
    </div>
  );
};

export default Balance;
