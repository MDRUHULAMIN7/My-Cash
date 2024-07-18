import axios from "axios";
import { useNavigate } from "react-router-dom";
import UseAuth from "./UseAuth";


const axiosSecure = axios.create({
    baseURL:'http://localhost:5000'
})



const UseAxiosSecure = () => {
    const navigate = useNavigate()

    const {logOut}=UseAuth()

    axiosSecure.interceptors.request.use(function(config)
    {
        const token = localStorage.getItem('access-token')
         console.log(token);
        config.headers.authorization = `${token}`
        return config
    },function(error){
        return Promise.reject(error)
    }
)

// 403 || 401

axiosSecure.interceptors.response.use(function(response){
    return response
},async (error)=>{
    const status = error.response.status;

    if(status ===401 || status ===403){
        await logOut()
        navigate('/login')
    }
}
)

    return axiosSecure;
};

export default UseAxiosSecure;