import React from "react";
import { useLoaderData } from "react-router";
import FoodCard from "../../Components/FoodCard/FoodCard";

const Fridge = () => {
  const foods = useLoaderData();
  return (
    <div className="w-11/12 lg:container mx-auto mt-20">
      <h2 className="text-5xl font-bold text-center">Community Fridge</h2>
      <p className="text-xl font-thin text-center mt-5 max-w-xl mx-auto">
        Explore all food items in our community. Track expiry dates and find inspiration for your meals.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
        {foods.map((food) => (
          <FoodCard key={food._id} food={food}></FoodCard>
        ))}
      </div>
    </div>
  );
};

export default Fridge;
