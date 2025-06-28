import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { MdOutlineDateRange } from "react-icons/md";
import { FaBoxes } from "react-icons/fa";
import { LuTag } from "react-icons/lu";
import { Link } from "react-router";
import { format } from "date-fns";
import AOS from "aos";
import "aos/dist/aos.css";

const FoodCard = ({ food }) => {
  const { _id, title, img, category, quantity, expiryDate } = food;
  food.expiryDate = new Date(expiryDate).toISOString();
  const currentDate = new Date().toISOString();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div data-aos="fade-up">
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className="card max-w-96 bg-base-100 border border-gray-300 hover:shadow-xl transition-shadow  hover:duration-200 group"
      >
        <figure>
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="h-52 w-full relative"
            src={img}
            alt=""
          />
          <span
            className={`${
              currentDate >= expiryDate ? "block" : "hidden"
            } badge badge-outline badge-error absolute top-2 right-2`}
          >
            Expired
          </span>
        </figure>
        <div className="card-body">
          <div className="flex justify-between items-center">
            <h2 className="card-title text-2xl font-bold group-hover:text-[#64b843]">
              {title}
            </h2>
          </div>

          <p className="flex items-center gap-2 text-lg">
            <LuTag />
            category: <span className="font-semibold">{category}</span>
          </p>
          <p className="flex items-center gap-2 text-lg">
            <FaBoxes /> Quantity:{" "}
            <span className="font-semibold">{quantity}</span>
          </p>
          <p className="flex items-center gap-2 text-lg">
            <MdOutlineDateRange /> Expiry Date:{" "}
            <span className="font-semibold">
              {format(new Date(expiryDate), "PP")}
            </span>
          </p>
          <div className="card-actions justify-end">
            <Link to={`/food-details/${_id}`} className="btn bg-[#64b843]">
              See Details
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FoodCard;
