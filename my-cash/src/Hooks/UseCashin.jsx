import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "./UseAxiosSecure";



const UseCashin = () => {
    const axiosSecure = UseAxiosSecure()
    const user = (localStorage.getItem("user"));
    const { data:cashindata=[], isLoading ,refetch} = useQuery({
        queryKey: ['cashindata', user],
        enabled: !!user,
        queryFn: async () => {
            try {
                const res = await axiosSecure.get("/cashin");
                return [res.data];
            } catch (err) {
             alert(err)
                
            }
        }
    });



    return [cashindata, isLoading,refetch];
};

export default UseCashin;
