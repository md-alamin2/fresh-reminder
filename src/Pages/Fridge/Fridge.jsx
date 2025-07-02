import React, { useState } from "react";
import { useLoaderData } from "react-router";
import FoodCard from "../../Components/FoodCard/FoodCard";
import axios from "axios";
import { CiSearch } from "react-icons/ci";
import emptyLottie from "../../assets/Lottis/as-11-emptyState.json";
import Lottie from "lottie-react";
import Loader from "../../Components/Laoder/Loader";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.30,
      ease: "easeOut",
      duration: 0.5,
    },
  },
};

const Fridge = () => {
  const foods = useLoaderData();
  const [selectedData, setSelectedData] = useState(foods);
  const foodsCategory = foods.map((food) => food.category);
  const categories = foodsCategory.slice(0, 4);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  // filter foods category
  const handleCategoryFilter = (e) => {
    e.preventDefault();
    setLoading(true);
    const category = e.target.value;
    if (category == "All Category") {
      setCategory(null);
      setSelectedData(foods)
      setTimeout(()=>setLoading(false), 200)
      return
    }

    axios
      .get(
        `https://ph-assignment-11-server-omega.vercel.app/foods/category/${category}`
      )
      .then((res) => {
        setSelectedData(res.data);
        if (category != "All Category") {
          setCategory(category);
          setLoading(false);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  // find food by search
  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    const from = e.target;
    const searchValue = from.search.value;

    axios
      .get(
        `https://ph-assignment-11-server-omega.vercel.app/food/search?searchValue=${searchValue}`
      )
      .then((res) => {
        setSelectedData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className="w-11/12 lg:container mx-auto mt-20">
      <title>FreshReminder-fridge</title>
      <h2 className="text-4xl md:text-5xl font-bold text-center">
        Community Fridge
      </h2>
      <p className="text-lg md:text-xl font-thin text-center mt-5 max-w-xl mx-auto">
        Explore all food items in our community. Track expiry dates and find
        inspiration for your meals.
      </p>
      {/* search section */}
      <div className="max-w-5xl mx-auto mt-10 bg-base-200 py-6 rounded-2xl">
        <form
          onSubmit={handleSearch}
          className="w-full flex flex-col md:flex-row items-center gap-8 px-6"
        >
          {/* search */}
          <fieldset className="fieldset flex items-center gap-3 md:w-[90%]">
            <input
              type="text"
              className="input rounded-2xl w-full"
              name="search"
              placeholder="Search by Food name and category"
            />
            <button className="btn bg-[#64b843]">
              <CiSearch size={20} /> Search
            </button>
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
      {loading ? (
        <Loader></Loader>
      ) : (
        <div>
          {selectedData.length <= 0 ? (
            <div className="w-11/12 lg:container mx-auto mt-20">
              <Lottie
                animationData={emptyLottie}
                style={{ height: 300 }}
              ></Lottie>
              <h2 className="text-5xl font-bold text-center">
                No Item found🚫
              </h2>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              // viewport={{once:true}}
              
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-15"
            >
              {selectedData.map((food) => (
                <FoodCard key={food._id} food={food}></FoodCard>
              ))}
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

export default Fridge;
