import React, { useState } from "react";
import { useLoaderData } from "react-router";
import FoodCard from "../../Components/FoodCard/FoodCard";
import axios from "axios";
import { CiSearch } from "react-icons/ci";

const Fridge = () => {
  const foods = useLoaderData();
  const [selectedData, setSelectedData] = useState(foods);
  const foodsCategory = foods.map((food) => food.category);
  const categories = foodsCategory.slice(0, 4);
  const [category, setCategory] = useState(null);

  const handleCategoryFilter = (e) => {
    e.preventDefault();
    const category = e.target.value;
    if (category == "All Category") {
      setCategory(null);
      return setSelectedData(foods);
    }

    axios
      .get(`http://localhost:3000/foods/category/${category}`)
      .then((res) => {
        setSelectedData(res.data);
        if (category != "All Category") {
          setCategory(category);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const from = e.target;
    const searchValue = from.search.value;

    axios
      .get(`http://localhost:3000/food/search?searchValue=${searchValue}`)
      .then((res) => {
        setSelectedData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-11/12 lg:container mx-auto mt-20">
      <h2 className="text-4xl md:text-5xl font-bold text-center">Community Fridge</h2>
      <p className="text-lg md:text-xl font-thin text-center mt-5 max-w-xl mx-auto">
        Explore all food items in our community. Track expiry dates and find
        inspiration for your meals.
      </p>
      {/* search section */}
      <div className="w-full mt-10 bg-base-200 py-6 rounded-2xl">
        <form
          onSubmit={handleSearch}
          className="w-full flex flex-col md:flex-row items-center gap-8 px-6"
        >
          {/* search */}
          <fieldset className="fieldset flex items-center md:w-[90%]">
            <input
              type="text"
              className="input rounded-2xl w-full"
              name="search"
              placeholder="Search by Food name and category"
            />
            <button className="btn bg-[#64b843]"><CiSearch size={20}/> Search</button>
          </fieldset>
          {/* filter */}
          <fieldset
            onChange={handleCategoryFilter}
            className="fieldset  md:w-[10%]"
          >
            <select
              defaultValue="All Category"
              name="type"
              className="select w-40 md:w-52"
            >
              <option>All Category</option>

              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </fieldset>
        </form>
        <span
          className={`badge bg-[#64b843] mt-5 md:mt-2 mx-auto md:mx-0 md:ml-6 ${
            category ? "block" : "hidden"
          }`}
        >
          Category: <span className="font-bold">{category}</span>
        </span>
      </div>
      {/* food card section */}
      {selectedData.length <= 0 ? (
        <div className="w-11/12 lg:container mx-auto mt-20">
          <h2 className="text-5xl font-bold text-center">No Item found</h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-15">
          {selectedData.map((food) => (
            <FoodCard key={food._id} food={food}></FoodCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default Fridge;
