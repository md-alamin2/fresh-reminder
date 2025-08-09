import React, { useEffect } from "react";
import FoodCard from "../FoodCard/FoodCard";
import { Link } from "react-router";
import boxLottie from "../../assets/Lottis/as-11-box.json";
import Lottie from "lottie-react";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.3,
      ease: "easeOut",
      duration: 0.3,
    },
  },
};

const NearlyExpired = ({ nearlyExpiredData }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{once:true}}
      className="w-11/12 lg:container mx-auto mt-20"
    >
      <div>
        <h2 className="text-4xl md:text-5xl font-bold text-center">
          Items Expiring Soon
        </h2>
        <p className="text-lg md:text-xl font-thin text-center mt-5 max-w-xl mx-auto">
          These items will expire within the next 5 days. Use them first to
          reduce waste!
        </p>
      </div>
      <div>
        {nearlyExpiredData.length <= 0 ? (
          <div className="text-center space-y-1 mt-5 bg-base-200 py-6 rounded-2xl">
            <Lottie animationData={boxLottie} style={{ height: 300 }}></Lottie>
            <h3 className="text-2xl font-thin opacity-70 max-w-96 mx-auto">
              No items are expiring soon. Your food management is on track!
            </h3>
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-auto gap-8 mt-10`}
          >
            {nearlyExpiredData.slice(0, 8).map((food) => (
              <FoodCard key={food._id} food={food}></FoodCard>
            ))}
          </div>
        )}
      </div>
      <Link to="/fridge" className="w-full flex justify-center">
        <button className="btn mt-5 bg-[#64b843] flex items-center gap-1">
          Explore more <FaArrowRight />
        </button>
      </Link>
    </motion.div>
  );
};

export default NearlyExpired;
