import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "./UseAxiosPublic";



const UserRoll = () => {
   
    const axiosPublic = UseAxiosPublic();

    const user = (localStorage.getItem("user"));

    const { data: roll = [], isLoading } = useQuery({
        queryKey: ['roll', user],
        enabled: !!user,
        queryFn: async () => {
            try {
                const res = await axiosPublic.get(`/user/${user}`);
                return [res.data.roll,res.data.status,res.data.
                    balance];
            } catch (err) {
             alert(err)
                
            }
        }
    });



    return [roll, isLoading];
};

export default UserRoll;
