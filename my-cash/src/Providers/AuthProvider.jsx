import { createContext, useEffect, useState } from "react";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";
import Swal from "sweetalert2";

export const AuthContext = createContext(null);
const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiospublic = UseAxiosPublic();

  const createUser = ({ userInfo }) => {
    setLoading(true);
    axiospublic
      .post("/users",userInfo)

      .then((res) => {
        if (res.data.insertedId) {
          axiospublic
            .get(`/user/${userInfo.email}`)
            .then((res) => {
              if (res.data.email) {
                console.log(res.data);
                localStorage.setItem("user", res.data.email);
                axiospublic.post('/jwt',userInfo)
                .then(res=>{
                    console.log(res.data.token);
                    if(res.data.token){
                        localStorage.setItem('access-token',res.data.token);
                        setLoading(false)
                    }
                })

                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Account Created Succesfully",
                  showConfirmButton: false,
                  timer: 2500,
                });
              }
            })
            .then((err) => {
              if (err) {
                Swal.fire({
                  position: "top-end",
                  icon: "warning",
                  title: "Something went wrong",
                  showConfirmButton: false,
                  timer: 2500,
                });
              }
            });
          setUser(res.data.data);
        }
      })
      .catch((err) => {
        if (err) {
          Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "Something went wrong",
            showConfirmButton: false,
            timer: 2500,
          });
        }
      });

    return;
  };

  useEffect(() => {

    
    if(localStorage.getItem("user")){
       
        console.log(localStorage.getItem("access-token"));
   
    }
    else{
        localStorage.removeItem('access-token')
        setLoading(false)
    }

  }, []);

  const signIn=({ userInfo })=>{
           if(userInfo){
            axiospublic.post('/loginuser',userInfo)
            .then(res=>{
              console.log(res.data);
                if(res.data.email){
                    localStorage.setItem("user", res.data.email);
                    axiospublic.post('/jwt',userInfo)
                    .then(res=>{
                        console.log(res.data.token);
                        if(res.data.token){
                            localStorage.setItem('access-token',res.data.token);
                            setLoading(false)
                        }
                    })
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: " Login successfully",
                        showConfirmButton: false,
                        timer: 2000,
                      });
                 return ("success")
                }
                else{
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: " something went Wrong",
                        showConfirmButton: false,
                        timer: 2500,
                      });
                }
                
            })
           
           }
  }

const logOut=()=>{
    localStorage.removeItem("user")
    if(!localStorage.getItem("user")){
        
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Logout Succesfully",
            showConfirmButton: false,
            timer: 2500,
          });

    }
}

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    logOut,signIn,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;
