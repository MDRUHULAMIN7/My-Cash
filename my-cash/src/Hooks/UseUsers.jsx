import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "./UseAxiosSecure";



const UseUsers = () => {
   
    const axiosSecure = UseAxiosSecure()

    const user = (localStorage.getItem("user"));

    const { data: users = [], isLoading } = useQuery({
        queryKey: ['users', user],
        enabled: !!user,
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/allusers`);
                return [res.data];
            } catch (err) {
             alert(err)
                
            }
        }
    });



    return [users, isLoading];
};

export default UseUsers;
