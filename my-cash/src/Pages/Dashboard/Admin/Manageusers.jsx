import { useState } from "react";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const Manageusers = () => {
  const axiosSecure = UseAxiosSecure();
  const axiosPublic = UseAxiosPublic();
  const [users, setUsers] = useState(null);
  const user = localStorage.getItem("user");

  const {
    refetch,data: userss = [],
    isLoading,
   
  } = useQuery({
    queryKey: ["userss", user],
    enabled: !!user,
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/allusers");
        console.log(res.data);
        setUsers(res.data);
        return [res.data];
      } catch (err) {
        alert(err);
      }
     
    },
  });

  

  const handleVerify = async (id, status,roll) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure to update  user status",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "red",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes Sure!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let amount =40
        if( roll==="agent"){
          amount=10000
        }
        const updatestatus = { updatestatus: status,updateamount:amount };
        console.log("aseto");
        const res = await axiosPublic.patch(`/userverify/${id}`, updatestatus);
        console.log(res);
        console.log("akhane aschi");
        if (res.data.modifiedCount > 0) {
          refetch()
          Swal.fire({
            title: " Successfull",
            text: "User Status updated ",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Requested Failed",
            text: "Something wrong!",
            icon: "error",
          });
        }
      }
    });
  };
  const handleAgent = async (id,roll) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure to Update roll",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes Sure!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const updateroll = { updateroll: roll };
        console.log("aseto");
        const res = await axiosPublic.patch(`/userupdateroll/${id}`, updateroll);
        console.log(res);
       
        if (res.data.modifiedCount > 0) {
          refetch()
          Swal.fire({
            title: " Successfull",
            text: "User Roll Updated ",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Requested Failed",
            text: "Something wrong!",
            icon: "error",
          });
        }
      }
    });
  };
  return (
    <div>
      <h1 className="text-3xl text-center my-5">Total Users {users?.length}</h1>

      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>*</th>
              <th>Name</th>
              <th>Roll</th>
              <th>status</th>
              <th>Make Agent</th>
              <th>Verify</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user?.name}</td>
                <td>{user?.roll}</td>
                <td>{user?.status}</td>
                <td>
                  {user?.roll != "agent" ? (
                    <button
                      onClick={() => handleAgent(user?._id, "agent")}
                      className="bg-red-500 w-fit p-[6px]   rounded-md"
                    >
                      Make Agent
                    </button>
                  ) : (
                    <p className="bg-green-500 w-fit p-[6px]  rounded-md">
                      Agent
                    </p>
                  )}
                </td>

                <td>
                  {" "}
                  {user?.status == "pending" || user?.status == "rejected" ? (
                    <button
                      onClick={() => handleVerify(user?._id, "verified",user?.roll)}
                      className="bg-green-500 w-fit p-[6px]   rounded-md"
                    >
                      Verify
                    </button>
                  ) : (
                    <p className="bg-green-500 w-fit p-[6px]  rounded-md">
                      Verified
                    </p>
                  )}{" "}
                </td>
                <td>
                  {user?.status !== "rejected" || user?.status == "verified" ? (
                    <button
                      onClick={() => handleVerify(user?._id, "rejected")}
                      className="bg-red-500 w-fit p-[6px]  rounded-md"
                    >
                      Reject
                    </button>
                  ) : (
                    <p className="bg-red-500 w-fit p-[6px]  rounded-md">
                      Rejected
                    </p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Manageusers;
