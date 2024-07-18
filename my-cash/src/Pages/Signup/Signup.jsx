import { useState } from "react";


import UseAuth from "../../Hooks/UseAuth";
import { Link } from "react-router-dom";


const Signup = () => {
    const {createUser}=UseAuth()
    const [error,setError]=useState("")
 

    const HandleSignUp=e=>{
        e.preventDefault()
        setError("")
        const name = e.target.name.value;
        const email = e.target.email.value;
        const mobile=e.target.mobile.value
        if(mobile.length <11 || mobile.length > 11){
          return setError("give a valid number")
        }
        const pin = e.target.pin.value;
        const roll = e.target.roll.value


        if(pin.length !== 5){
            console.log("ok");
            setError("Pin must be 5 digit")
            return
        }
        
        const userInfo={name,email,pin,roll,balance:0,status:"pending", mobile}
        console.log(userInfo);

        if(userInfo){
            createUser({userInfo})
    
        }

    }
    return (
        <div className="h-full">
         <div className="mx-auto mt-5 md:mt-12">
  <div className="hero-content flex-col lg:flex-row">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Create Your Account</h1>
      <p className="py-6">
       For create account you will be get 40 taka bonus 
      </p>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form className="card-body " onSubmit={HandleSignUp}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="name" name="name" placeholder="your name" className="input input-bordered" required />
        </div>
        <div className="flex-col  col-span-1">
 <span>Select Roll</span> <br />
 <select defaultValue={'default'} placeholder="accunt roll" name="roll" className="select rounded-lg select-bordered py-2 mt-1 w-full " required>
<option value="user">User</option>
<option value="agent">Agent</option>
</select>
</div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Phone</span>
          </label>
          <input type="number" maxLength={11} name="mobile" placeholder="mobile number" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Pin</span>
          </label>
          <input type="number" name="pin" maxLength={5} minLength={5} placeholder="give a 5 digit pin number" className="input input-bordered" required />
       
        </div>
        <div className="form-control mt-6">
          <button className="btn bg-[#d9a46c]">SignUp</button>
        </div>
        <p className="text-center text-red-500 text-lg font-semibold mt-2">{error}</p>
        <p className="text-sm text-center mt-1">Already have an account Login to <Link to={"/signin"} className="underline ">account</Link></p>
      </form>
    </div>
  </div>
</div>


        </div>
    );
};

export default Signup;