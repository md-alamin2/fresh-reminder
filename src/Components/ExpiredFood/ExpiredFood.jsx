import React, { useEffect} from "react";
import FoodCard from "../FoodCard/FoodCard";
import Lottie from "lottie-react";
import emptyLottie from "../../assets/Lottis/as-11-emptyState.json";
import AOS from "aos";
import "aos/dist/aos.css";
import Aos from "aos";
import {motion} from "framer-motion"

const ExpiredFood = ({expired}) => {

  useEffect(() => {

      Aos.init({duration:1000})
  }, []);

  return (
    <div className="w-11/12 lg:container mx-auto mt-20">
      <div 
      // data-aos="zoom-out" data-aos-duration="2000"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center">
          Expired Food
        </h2>
        <p className="text-lg md:text-xl font-thin text-center mt-5 max-w-xl mx-auto">
          These items have passed their expiry date. Please review and remove
          them safely.
        </p>
      </div>
      <div>
        {expired.length <= 0 ? (
          <motion.div initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }} className="text-center space-y-1 mt-5 bg-base-200 py-6 rounded-2xl">
            <Lottie
              animationData={emptyLottie}
              style={{ height: 300 }}
            ></Lottie>
            <h3 className="text-2xl font-thin max-w-96 mx-auto opacity-70">
              No expired items found. You're doing a great job managing your
              food!
            </h3>
          </motion.div>
        ) : (
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-auto gap-8 mt-10`}
          >
            {expired.map((food) => (
              <FoodCard key={food._id} food={food}></FoodCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpiredFood;
