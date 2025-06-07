import React, { use, useState } from "react";
import MyItemRow from "../MyItemRow/MyItemRow";
import Swal from "sweetalert2";
import axios from "axios";

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
