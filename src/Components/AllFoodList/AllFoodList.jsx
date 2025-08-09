import React from "react";
import { motion, easeIn } from "framer-motion";
import emptyLottie from "../../assets/Lottis/as-11-emptyState.json";
import { format } from "date-fns";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router";
import Lottie from "lottie-react";

const AllFoodList = ({ foods, handleDeleteFood }) => {

  if (foods?.length <= 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 1.2 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: easeIn }}
        className="flex justify-center mt-5"
      >
        <div className="text-center space-y-4">
          <Lottie animationData={emptyLottie} style={{ height: 300 }}></Lottie>
          <h3 className="text-3xl font-bold">
            You don't have added any food yet
          </h3>
          <Link to="/dashboard/add-food" className="btn bg-[#64b843]">
            Add Food
          </Link>
        </div>
      </motion.div>
    );
  }
  return (
    <div className="overflow-x-auto rounded-box border border-base-content/10 bg-base-100 my-10">
      <table className="table table-xs md:table-md">
        {/* head */}
        <thead>
          <tr className="text-center">
            <th className="md:text-start">Food</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Expiry Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {foods?.map((food) => (
            <tr key={food._id} className="text-center">
              <td className="flex flex-col md:flex-row items-center gap-3">
                <img className="w-20 rounded-xl" src={food.img} alt="" />
                <h3 className="md:text-lg font-semibold">{food.title}</h3>
              </td>
              <td>
                <p className="font-bold">{food.quantity}</p>
              </td>
              <td>
                <p
                  className={`badge ${
                    food?.expiryDate > new Date().toISOString()
                      ? "badge-primary text-white"
                      : "badge-error"
                  }`}
                >
                  {food?.expiryDate > new Date().toISOString()
                    ? "Fresh"
                    : "Expired"}
                </p>
              </td>
              <td>
                <p className="font-bold">
                  {format(new Date(food.expiryDate), "P")}
                </p>
              </td>
              <td>
                <div className="flex flex-col md:flex-row gap-1 md:gap-2 justify-center">
                  <button
                    onClick={() => handleDeleteFood(food._id)}
                    className="btn btn-sm md:btn-md bg-[#64b843]"
                  >
                    <MdDeleteForever size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllFoodList;
