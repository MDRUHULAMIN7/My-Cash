
import { useState } from "react";
import UseAuth from "../../Hooks/UseAuth";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
    const {signIn}=UseAuth()
    const [error,setError]=useState("")
   const navigate = useNavigate()

    const HandleSignip=e=>{
        e.preventDefault()
        setError("")
        const email = e.target.email.value;
        const pin = e.target.pin.value;
        const userInfo={email,pin}
        console.log(userInfo);

        if(userInfo){
          const result =  signIn({userInfo})
          if(result === "success")
            e.target.reset()
            navigate("/")
       
        }

    }
    return (
        <div className="h-[72vh]">
         <div className="mx-auto mt-5 md:mt-24">
  <div className="hero-content flex-col lg:flex-row">
    <div className="text-center lg:text-left">
      <h1 className="text-4xl font-bold">Login to your Your Account</h1>
      <p className="py-6">
       Already have a Account Please Login
      </p>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form className="card-body " onSubmit={HandleSignip}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" placeholder="email" className="input input-bordered" />
        </div>
       
        <div className="form-control">
          <label className="label">
            <span className="label-text">Pin</span>
          </label>
          <input type="number" name="pin" maxLength={5} minLength={5} placeholder="give a 5 digit pin number" className="input input-bordered" required />
       
        </div>
        <div className="form-control mt-6">
          <button className="btn bg-[#d9a46c]">Signin</button>
        </div>
        <p className="text-center text-red-500 text-lg font-semibold mt-2">{error}</p>
        <p className="text-sm text-center mt-1">Dont have any account create <Link to={"/signup"} className="underline ">account</Link></p>
      </form>
    </div>
  </div>
</div>
        </div>
    );
};

export default Signin;