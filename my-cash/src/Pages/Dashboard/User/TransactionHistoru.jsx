import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";



const TransactionHistoru = () => {

    const axiosSecure = UseAxiosSecure()
    const user = (localStorage.getItem("user"));
    const { data:history=[]} = useQuery({
        queryKey: ['history', user],
        enabled: !!user,
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/user-transition/${user}`);
                return [res.data];
            } catch (err) {
             alert(err)
                
            }
        }
    });
    console.log(history);
    return (
        <div>

            <h1 className="text-gray-500 text-4xl font-semibold my-5 text-center">Total Transitions : {history[0]?.length}</h1>
            
            <div className="overflow-x-auto my-10">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>*</th>
              <th>UserName</th>
              <th>Mobile</th>
              <th>Type</th>
              <th> amount</th>
              <th> TransitionDate</th>
              
            </tr>
          </thead>
          <tbody className="text-gray-800 p-10">
            {history[0]?.slice(0,20).map((data, index) => (
            <tr className=" " key={data._id}>
                <td>{index+1}</td>
                <td>{data?.username}</td>
                <td>{data?.mobile}</td>
                <td>{data?.type}</td>
                <td>{data?.amount} Taka</td>
                <td>{data?.time.slice(0,10)}</td>

            </tr>
            ))}
          </tbody>
        </table>
      </div>
        </div>
    );
};

export default TransactionHistoru;