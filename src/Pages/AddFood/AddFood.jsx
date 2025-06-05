import React, { useEffect } from "react";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";

const AddFood = () => {
  const { user } = useAuth();
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleAddFoods = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const food = Object.fromEntries(formData.entries());
    const newFood = {
      ...food,
      addedDate: new Date(),
      expiryDate: new Date(food.expiryDate),
      status: "fresh",
      userEmail: user.email,
    };

    // add task to db
    axios
      .post("http://localhost:3000/foods", newFood)
      .then((data) => {
        if (data.data.insertedId) {
          Swal.fire({
            title: "Task added successfully!",
            icon: "success",
            timer: 2000,
          });
        }
        form.reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <title>FreshReminder-Add Task</title>
      <div className="w-11/12 lg:container mx-auto mt-8  lg:px-28 md:py-17">
        <div data-aos="fade-left" className="text-center md:px-18 space-y-8">
          <h1 className="text-5xl">Add New Food</h1>
          <p>
            This Food Expiry Tracker website helps users manage their groceries
            by tracking expiry dates, reducing food waste, and sending timely
            alerts. It offers an easy way to monitor food freshness and stay
            organized effortlessly
          </p>
        </div>
        <form data-aos="fade-right" onSubmit={handleAddFoods} className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <fieldset className="fieldset rounded-box w-full">
              <label className=" text-xl">
                Food Title <sup className="text-red-500">*</sup>
              </label>
              <input
                type="text"
                name="title"
                className="input w-full"
                placeholder="Food Title"
                required
              />
            </fieldset>
            <fieldset className="fieldset rounded-box w-full">
              <label className=" text-xl">
                Quantity <sup className="text-red-500">*</sup>
              </label>
              <input
                type="text"
                name="quantity"
                className="input w-full"
                placeholder="Quantity (Pieces, Gram, KG, Liter)"
                required
              />
            </fieldset>
            <fieldset className="fieldset rounded-box w-full">
              <label className=" text-xl">
                Category <sup className="text-red-500">*</sup>
              </label>
              <select
                defaultValue="Pick a Category"
                name="category"
                className="select w-full"
                required
              >
                <option disabled={true}>Pick a Category</option>
                <option>Dairy</option>
                <option>Meat</option>
                <option>Vegetables</option>
                <option>Snacks</option>
              </select>
            </fieldset>
            <fieldset className="fieldset rounded-box w-full">
              <span className=" text-xl">
                Expiry Date <sup className="text-red-500">*</sup>
              </span>
              <label className="label">
                <input
                  type="date"
                  name="expiryDate"
                  required
                  className="input w-full"
                />
              </label>
            </fieldset>
          </div>
          <fieldset className="fieldset rounded-box w-full my-6">
            <label className=" text-xl">
              Food Photo URL <sup className="text-red-500">*</sup>
            </label>
            <input
              type="url"
              name="img"
              className="input w-full"
              placeholder="Write a title"
              required
            />
          </fieldset>
          <fieldset className="fieldset rounded-box w-full my-6">
            <label className=" text-xl">
              Description <sup className="text-red-500">*</sup>
            </label>
            <textarea
              className="textarea h-25 w-full"
              placeholder="Write Description"
              name="description"
              required
            ></textarea>
          </fieldset>

          <input
            type="submit"
            value="Add Task"
            className="btn w-full bg-[#64b843]"
          />
        </form>
      </div>
    </>
  );
};

export default AddFood;
