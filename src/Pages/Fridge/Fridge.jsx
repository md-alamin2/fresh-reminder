import React, { useState } from "react";
import { useLoaderData } from "react-router";
import FoodCard from "../../Components/FoodCard/FoodCard";
import axios from "axios";

const Fridge = () => {
  const foods = useLoaderData();
  const [selectedData, setSelectedData] = useState(foods);
  const foodsCategory = foods.map((food) => food.category);
  const category = foodsCategory.slice(0, 4);

  const handleSearch = (e) => {
    e.preventDefault();
    const category = e.target.value;
    if (category == "All Category") {
      return setSelectedData(foods);
    }

    axios
      .get(`http://localhost:3000/foods/category/${category}`)
      .then((res) => {
        setSelectedData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-11/12 lg:container mx-auto mt-20">
      <h2 className="text-5xl font-bold text-center">Community Fridge</h2>
      <p className="text-xl font-thin text-center mt-5 max-w-xl mx-auto">
        Explore all food items in our community. Track expiry dates and find
        inspiration for your meals.
      </p>
      {/* search section */}
      <div className="w-full mt-10">
        <form className="w-full flex items-center bg-base-200 rounded-2xl">
          {/* search */}
          <fieldset className="fieldset flex items-center w-[80%] px-4 py-6">
            <input
              type="text"
              className="input w-full"
              placeholder="Search by Food name and category"
            />
            <input type="submit" value="Search" className="btn" />
          </fieldset>
          {/* filter */}
          <fieldset onChange={handleSearch} className="fieldset  w-[20%]">
            <select
              defaultValue="All Category"
              name="type"
              className="select w-30 md:w-52"
            >
              <option>All Category</option>

              {category.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </fieldset>
        </form>
      </div>
      {/* food card section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-15">
        {selectedData.map((food) => (
          <FoodCard key={food._id} food={food}></FoodCard>
        ))}
      </div>
    </div>
  );
};

export default Fridge;
