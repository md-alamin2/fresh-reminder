import React from "react";
import { motion } from "framer-motion";
import { MdOutlineCategory, MdOutlineDateRange } from "react-icons/md";
import { FaBoxes } from "react-icons/fa";
import { Link } from "react-router";
import { format } from "date-fns";

const FoodCard = ({ food }) => {
  const {_id, title, img, category, quantity, expiryDate } = food ;
  food.expiryDate = new Date(expiryDate)
  const  currentDate = new Date();
  

  return (
    <div className="card bg-base-100 max-w-96 border border-gray-300 hover:shadow-xl transition-shadow hover:duration-300 group">
      <figure>
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="h-52 w-full relative"
          src={img}
          alt=""
        />
         <span className={`${currentDate>expiryDate ? "block" : "hidden"} badge badge-outline badge-error absolute top-2 right-2`}>Expired</span>
      </figure>
      <div className="card-body">
        <div className="flex justify-between items-center">
          <h2 className="card-title text-2xl font-bold group-hover:text-[#64b843]">{title}</h2>
        </div>

        <p className="flex items-center gap-2 text-lg">
          <MdOutlineCategory />category: <span className="font-semibold">{category}</span>
        </p>
        <p className="flex items-center gap-2 text-lg">
          <FaBoxes /> Quantity: <span className="font-semibold">{quantity}</span>
        </p>
        <p className="flex items-center gap-2 text-lg">
          <MdOutlineDateRange /> Expiry Date: <span className="font-semibold">{format(new Date(expiryDate), "P")}</span>
        </p>
        <div className="card-actions justify-end">
          <Link to={`/food-details/${_id}`} className="btn bg-[#64b843]">See Details</Link>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
