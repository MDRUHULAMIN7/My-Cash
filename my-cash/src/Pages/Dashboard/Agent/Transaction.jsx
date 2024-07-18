import { useEffect, useState } from "react";
import UseCashin from "../../../Hooks/UseCashin";
import UserRoll from "../../../Hooks/UseRoll";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";

const Transaction = () => {
  const [roll] = UserRoll();
  const balance = roll[2];
  const [cashindata, refetch] = UseCashin();
  const [datas, setDatas] = useState();
  const axiosSecure = UseAxiosSecure();
  useEffect(() => {
    const cashout = cashindata[0]?.filter((data) => data.type === "cashout");
    setDatas(cashout);
  }, [cashindata]);

  const setCashin = () => {
    const cashin = cashindata[0]?.filter((data) => data.type === "cashin");
    setDatas(cashin);
    refetch();
  };

  const setCashout = () => {
    const cashout = cashindata[0]?.filter((data) => data.type === "cashout");
    setDatas(cashout);
    refetch();
  };

  const handleCashin = (mobile, agentnumber, cashinamount,id) => {
    const updateInfo = {
      cashinamount: cashinamount,
      agentnumber: agentnumber,
      statusId:id
    };
    console.log(mobile);
    if (mobile) {
      Swal.fire({
        title: "Are you sure?",
        text: "Are you sure to approve cashin",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "red",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes Sure!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          axiosSecure
            .patch(`/approvecashin/${mobile}`, updateInfo)
            .then((res) => {
              if (
                res.data[0].modifiedCount > 0 &&
                res.data[1].modifiedCount > 0 &&  res.data[2].modifiedCount > 0 && res.data[3].insertedId
              ) {
              
                Swal.fire({
                  title: "cashin  Successfull",
                  text: "check balance  ",
                  icon: "success",
                });
               
              } else {
                Swal.fire({
                  title: " Approved failed",
                  text: "something went wromg ",
                  icon: "error",
                });
              }
              refetch();
            });
        }
      });
    }
  };
  const handleCashOut = (mobile, agentnumber,cashoutamount,id) => {
    const newAmount = cashoutamount * 0.15 + cashoutamount;


    const updateInfo = {
      cashinamount:  newAmount ,
      agentnumber: agentnumber,
      statusId:id
    };
    console.log(mobile);
    if (newAmount) {
      Swal.fire({
        title: "Are you sure?",
        text: "Are you sure to approve cashin",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "red",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes Sure!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          axiosSecure
            .patch(`/approvecashout/${mobile}`, updateInfo)
            .then((res) => {
              console.log(res);
              if (
                res.data[0].modifiedCount > 0 &&
                res.data[1].modifiedCount > 0 &&  res.data[2].modifiedCount > 0 && res.data[3].insertedId
              ) {
                refetch();
                Swal.fire({
                  title: "cashin  Successfull",
                  text: "check balance  ",
                  icon: "success",
                });
                refetch();
              } else {
                Swal.fire({
                  title: " Approved failed",
                  text: "something went wromg ",
                  icon: "error",
                });
              }
            });
        }
      });
    }
  };
  return (
    <div>
      <h1 className="mt-10 mx-auto text-center text-3xl ">
        Your Total Balance {balance} taka
      </h1>

      <div className="md:w-1/4 w-full px-8">
        <div className="form-control ">
          <label className="label cursor-pointer">
            <span className="label-text">Approved Cashin</span>
            <input
              onClick={setCashin}
              type="radio"
              name="radio-10"
              className="radio checked:bg-green-500"
              defaultChecked
            />
          </label>
        </div>
        <div className="form-control ">
          <label className="label cursor-pointer">
            <span className="label-text">Approved Cashout</span>
            <input
              onClick={setCashout}
              type="radio"
              name="radio-10"
              className="radio checked:bg-blue-500"
              defaultChecked
            />
          </label>
        </div>
      </div>

      <div className="overflow-x-auto my-10">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>*</th>
              <th>UserName</th>
              <th>Mobile</th>
              <th>Type</th>
              <th> amount</th>
              <th> Status</th>
              <th>Approved</th>
            </tr>
          </thead>
          <tbody >
            {datas?.map((user, index) => (
              <tr className="py-24" style={{padding:4}} key={user._id}>
                <th>{index + 1}</th>
                <td>{user?.name}</td>
                <td>{user?.mobile}</td>
                <td>{user?.type}</td>

                {user?.type === "cashin" ? (
                  <td> {user?.cashinamount} Taka</td>
                ) : (
                  <td> {user?.cashoutamount} Taka</td>
                )}
                {user?.type === "cashin" ? (
                  <td> {user?.cashinstatus} </td>
                ) : (
                  <td> {user?.cashoutstatus} </td>
                )}
                {user?.type === "cashin" && user?.cashinstatus === "pending" ? (
                  <button
                    className="bg-red-500 p-1 rounded-xl"
                    onClick={() =>
                      handleCashin(
                        user?.mobile,
                        user?.agentnumber,
                        user?.cashinamount,
                        user?._id
                      )
                    }
                  >
                    {" "}
                    Approve Cashin
                  </button>
                ) : (
                    <button className="bg-green-500 p-1 rounded-xl">
                      {" "}
                      Approved
                    </button>
                  ) &&
                  (user?.type !== "cashin" &&
                    user?.cashoutstatus === "pending") ? (
                  <button onClick={()=>handleCashOut(
                    user?.mobile,
                        user?.agentnumber,
                        user?.cashoutamount,
                        user?._id
                  )} className="bg-red-500 p-1 rounded-xl">
                    {" "}
                    Approve Cashout
                  </button>
                ) : (
                  <button className="bg-green-500 p-1 rounded-xl">
                    {" "}
                    Approved
                  </button>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transaction;
