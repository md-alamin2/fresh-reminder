import React, { useEffect, useState } from "react";
import FoodCard from "../FoodCard/FoodCard";
import Lottie from "lottie-react";
import emptyLottie from "../../assets/Lottis/as-11-emptyState.json";

const ExpiredFood = () => {
  const [allFoods, setAllFoods] = useState([]);
  const currentDay = new Date();
  const expiredFood = allFoods.filter(
    (food) => new Date(food.expiryDate) < currentDay
  );

  useEffect(() => {
    fetch("http://localhost:3000/foods")
      .then((res) => res.json())
      .then((data) => setAllFoods(data));
  }, []);

  if (expiredFood.length <= 0) {
    return (
      <div className="w-11/12 lg:container mx-auto mt-20">
        <h2 className="text-5xl font-bold text-center">Expired Food</h2>
        <p className="text-xl font-thin text-center mt-5 max-w-xl mx-auto">
          These items have passed their expiry date. Please review and remove
          them safely.
        </p>
        <div className="text-center space-y-1 mt-5 bg-base-200 py-6 rounded-2xl">
          <Lottie animationData={emptyLottie} style={{ height: 300 }}></Lottie>
          <h3 className="text-2xl font-thin max-w-96 mx-auto opacity-70">
            No expired items found. You're doing a great job managing your food!
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className="w-11/12 lg:container mx-auto mt-20">
      <h2 className="text-5xl font-bold text-center">Expired Food</h2>
      <p className="text-xl font-thin text-center mt-5 max-w-xl mx-auto">
        These items have passed their expiry date. Please review and remove them
        safely.
      </p>
      <div className={`grid grid-cols-1 md:grid-cols-2 ${
          expiredFood.length == 1 && "lg:grid-cols-1"
        } ${expiredFood.length == 2 && "lg:grid-cols-2"} ${
          expiredFood.length >= 3 && "lg:grid-cols-3"
        } justify-self-center gap-8 mt-10`}>
        {expiredFood.map((food) => (
          <FoodCard key={food._id} food={food}></FoodCard>
        ))}
      </div>
    </div>
  );
};

export default ExpiredFood;
