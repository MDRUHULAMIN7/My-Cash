import axios from "axios";

const axiosPublic = axios.create({
    baseURL:'https://my-cash-cbbh2rsjb-md-ruhul-amins-projects-5b3cca0b.vercel.app/'
})
// https://my-cash-cbbh2rsjb-md-ruhul-amins-projects-5b3cca0b.vercel.app/
const UseAxiosPublic =()=>{
    return axiosPublic;
};
export default   UseAxiosPublic 