import React from "react";
import { motion } from "framer-motion";
import { MdOutlineCategory } from "react-icons/md";
import { FaBoxes } from "react-icons/fa";
import { Link } from "react-router";

const FoodCard = ({ food }) => {
  const {_id, title, img, category, quantity, expiryDate } = food;
  food.expiryDate = new Date(expiryDate)
  const  currentDate = new Date();
  

  return (
    <div className="card bg-base-100 border border-gray-300 hover:shadow-xl transition-shadow hover:duration-300 group">
      <figure>
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="h-52 w-full"
          src={img}
          alt=""
        />
      </figure>
      <div className="card-body">
        <div className="flex justify-between items-center">
          <h2 className="card-title text-2xl font-bold group-hover:text-[#64b843]">{title}</h2>
          <span className={`${currentDate>expiryDate ? "block" : "hidden"} badge badge-outline badge-error`}>Expired</span>
        </div>

        <p className="flex items-center gap-2 text-lg">
          <MdOutlineCategory />category: <span className="font-semibold">{category}</span>
        </p>
        <p className="flex items-center gap-2 text-lg">
          <FaBoxes /> Quantity: <span className="font-semibold">{quantity}</span>
        </p>
        <div className="card-actions justify-end">
          <Link to={`/food-details/${_id}`} className="btn bg-[#64b843]">See Details</Link>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
