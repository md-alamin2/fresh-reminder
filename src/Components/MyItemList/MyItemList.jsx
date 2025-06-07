import React, { use } from "react";
import MyItemRow from "../MyItemRow/MyItemRow";

const MyItemList = ({ myItemsPromise }) => {
  const myItemsData = use(myItemsPromise);

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
            <MyItemRow key={myItem._id} myItem={myItem}></MyItemRow>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyItemList;
