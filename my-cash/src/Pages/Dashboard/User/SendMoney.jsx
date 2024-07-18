import { useState } from "react";

import img from "../../../../public/send.png";
import UseUsers from "../../../Hooks/UseUsers";
const SendMoney = () => {
  const [error, setError] = useState();
  const [users]=UseUsers()
  const user = (localStorage.getItem("user"));
  const me = users[0]?.find(data=> data.email === user)
  const HandleSend= (e) => {
    setError("");
    e.preventDefault();
   
    const amount =parseInt(e.target.amount.value);
    if(me?.balance <= amount ){
        return setError("insufficient balance")
    }

    if( amount < 50){
      return setError("minimum send amount is 50 taka")
    }
    const sentnumber=e.target.sentnumber.value;
    if(sentnumber.length >11 || sentnumber.length <11 ){
        return setError("invalid number")
    }
   const pin=e.target.pin.value;
   if(pin){
    const SendInfo={
        username:me?.name,
        pin:pin,
        mobile:me?.mobile,
        sentnumber:sentnumber,
        amount:amount,
    
       }
       console.log(SendInfo);
   }


  };
  return (
  <div>
     <h1 className="text-4xl text-center my-4 uppercase ">
          Send Money Easily With MyCash
        </h1>
        <p className="text-center mt-2">
          {" "}
          sendmoney will be cut 5% of sent amount{" "}
        </p>
      <div className="md:flex mx-auro items-center justify-center gap-x-5">
      <div className="w-full md:w-1/2 px-2">
        <img src={img} alt="" />
      </div>
      <div className="w-full my-3 md:my-0 md:w-1/2">
       

        <div className="card bg-base-100 mx-auto mt-4 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body " onSubmit={HandleSend}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Amount</span>
              </label>
              <input
                type="number"
                name="amount"
                placeholder="minimum amount is 50 taka"
                className="input input-bordered"
              />
            </div>
            <div className="flex-col  col-span-1">
              <span>Sent Number</span> <br />
              <input
                type="number"
                className="input input-bordered w-full"
                name="sentnumber"
                placeholder="sent number"
                id=""
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Pin</span>
              </label>
              <input
                type="number"
                name="pin"
                maxLength={5}
                minLength={5}
                placeholder="give  pin number"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-[#d9a46c]">Send Money</button>
            </div>
            <p className="text-center text-red-500 text-lg font-semibold mt-2">{error}
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
  );
};

export default SendMoney;
