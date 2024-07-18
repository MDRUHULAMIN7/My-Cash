import { useState } from "react";
import UseUsers from "../../../Hooks/UseUsers";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";



const Cashout= () => {
    const [error,setError]=useState("")
     const axiosSecure=UseAxiosSecure()
    const [users]=UseUsers([])
    const agents=users[0]?.filter(user=> user.roll === "agent")
    const user =users[0]?.find(user=>user.email === localStorage.getItem("user"))
    const HandlCashin=(e)=>{   
        e.preventDefault()
        setError("")
        const cashoutamount = parseInt(e.target.amount.value);
        if(cashoutamount < 50 ){
          return setError("minimum amount is 50 taka")
        }
        const agentnumber=e.target.agentnumber.value;
        const cashinpin=e.target.pin.value;
        const limit = parseInt( user?.balance)
        if(cashoutamount + cashoutamount * 0.015 > limit){
          return setError("insaufficent balance")
        }
        
        setError("")
        const CashOutInfo={cashoutamount ,agentnumber,cashinpin,name:user?.name,mobile:user?.mobile,email:user?.email,
          status:user?.status,balance:user?.balance,type:"cashout",cashoutstatus:"pending",
        }
        if(CashOutInfo.cashinpin){
          axiosSecure.post("/cashin",CashOutInfo)
           .then(res=>{
            if(res.data.insertedId){
              Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Cashout Request Successfull",
                text:"wait for agent approve !",
                showConfirmButton: false,
                timer: 2000
              });
              e.target.reset()
            }
            else{
              Swal.fire({
                position: "top-end",
                icon: "error",
                title: "CashOut Request failed",
                text:"something went wrong!",
                showConfirmButton: false,
                timer: 2000
              });
            }
           })
        }
      

    }
    return (
        <div>
          <h1 className="text-4xl text-center my-4 uppercase ">Cash Out by a Agent in MyCash</h1>
          <p className="text-center mt-2"> please send a request to cashout from agent in 1.5% charge </p>

          <div className="card bg-base-100 mx-auto mt-4 w-full max-w-sm shrink-0 shadow-2xl">
      <form className="card-body " onSubmit={HandlCashin}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">amount</span>
          </label>
          <input type="number" name="amount" placeholder="minimum amount is 50 taka" className="input input-bordered" />
        </div>
        <div className="flex-col  col-span-1">
 <span>Select Agent Number</span> <br />
 <select defaultValue={'default'} placeholder="Number" name="agentnumber" className="select rounded-lg select-bordered py-2 mt-1 w-full " required>
{agents?.map((agent)=> <option key={agent._id} value={agent.mobile}>{agent.mobile}</option>
)}


</select>

</div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Pin</span>
          </label>
          <input type="number" name="pin" maxLength={5} minLength={5} placeholder="give  pin number" className="input input-bordered" required />
       
        </div>
        <div className="form-control mt-6">
          <button className="btn bg-[#d9a46c]">Send Request</button>
        </div>
        <p className="text-center text-red-500 text-lg font-semibold mt-2">{error}</p>
       
      </form>
    </div>
        </div>
    );
};

export default Cashout;