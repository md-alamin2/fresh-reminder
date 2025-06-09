import React, { use, useState } from "react";
import MyItemRow from "../MyItemRow/MyItemRow";
import Swal from "sweetalert2";
import axios from "axios";
import Lottie from "lottie-react";
import emptyLottie from "../../assets/Lottis/as-11-emptyState.json";
import { Link } from "react-router";

const MyItemList = ({ myItemsPromise }) => {
  const myItems = use(myItemsPromise);
  const [myItemsData, setMyItemsData] = useState(myItems);

  // delete added food
  const handleDeleteFood = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // delete food
        axios
          .delete(`http://localhost:3000/foods/${id}`)
          .then((data) => {
            const remainingFood = myItemsData.filter(
              (myItem) => myItem._id !== id
            );
            setMyItemsData(remainingFood);
            if (data.data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your food has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  if (myItemsData.length <= 0) {
    return (
      <div className="flex justify-center mt-5">
        <div className="text-center space-y-4">
          <Lottie animationData={emptyLottie} style={{ height: 300 }}></Lottie>
          <h3 className="text-3xl font-bold">You don't have added any food yet</h3>
          <Link to="/add-food" className="btn bg-[#64b843]">Add Food</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-box border border-base-content/10 bg-base-100 mt-10">
      <table className="table">
        {/* head */}
        <thead>
          <tr className="text-center">
            <th className="md:text-start">Food</th>
            <th>Quantity</th>
            <th>Expiry Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {myItemsData.map((myItem) => (
            <MyItemRow
              key={myItem._id}
              myItem={myItem}
              handleDeleteFood={handleDeleteFood}
            ></MyItemRow>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyItemList;
