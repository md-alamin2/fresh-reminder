import { format } from "date-fns";
import React, { useState } from "react";
import { useLoaderData } from "react-router";
import axios from "axios";
import useAuth from "../../Hooks/useAuth";
import CountDown from "../../Components/CountDown/CountDown";
import Swal from "sweetalert2";
import { LuTag } from "react-icons/lu";
import { FaBoxes } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import { SiCodefresh } from "react-icons/si";
import {motion} from "framer-motion";

const FoodDetails = () => {
  const { user } = useAuth();
  const singleFood = useLoaderData();

  const {
    _id,
    title,
    category,
    img,
    quantity,
    addedDate,
    expiryDate,
    description,
    userEmail,
  } = singleFood || {};
  const [noteData, setNoteData] = useState(singleFood?.noteData);
  const currentDay = new Date();
  singleFood.expiryDate = new Date(expiryDate);

  // add note to db
  const handleAddNote = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const newNote = Object.fromEntries(formData.entries());
    const noteData = {
      note_dec: newNote.note_dec,
      note_added_date: new Date(),
    };
    // update note on db
    axios
      .patch(`https://ph-assignment-11-server-omega.vercel.app/foods/${_id}`, noteData)
      .then((data) => {
        if (data.data.modifiedCount) {
          setNoteData(noteData);
          Swal.fire({
            title: "Note updated successfully!",
            icon: "success",
            timer: 2000,
          });
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1}} className="w-11/12 lg:container mx-auto mt-20">
      <CountDown expiryDate={expiryDate}></CountDown>
      <div  className="flex flex-col md:flex-row items-center gap-6 border border-gray-300 p-4 rounded-2xl">
        <div>
          <img className="w-96 rounded-lg" src={img} alt="" />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Name : {title}</h2>
          <p className="text-lg flex items-center gap-1">
            <LuTag /> Category : {category}
          </p>
          <p className="text-lg flex items-center gap-1">
            <FaBoxes /> Quantity : {quantity}
          </p>
          <p className="text-lg flex items-center gap-1">
            <MdOutlineDateRange /> Added Date :{" "}
            {format(new Date(addedDate), "PP")}
          </p>
          <p className="text-lg flex items-center gap-1">
            <MdOutlineDateRange /> Expiry Date :{" "}
            {format(new Date(expiryDate), "PP")}
          </p>
          <p className="text-lg flex items-center gap-1 border-t border-b border-dashed my-2 py-4">
            <SiCodefresh />
            Status :{" "}
            <span
              className={`badge font-semibold ${
                currentDay > expiryDate ? "badge-error" : "badge-success"
              }`}
            >
              {currentDay > expiryDate ? "Expired" : "Fresh"}
            </span>
          </p>
          <p className="text-lg">
            Description:{" "}
            <span className="text-sm font-thin">{description}</span>
          </p>
        </div>
      </div>
      {/* note area */}
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1}} className="bg-base-200 rounded-2xl p-6 mt-8">
        <h3 className="text-xl font-semibold">Notes:</h3>
        {noteData ? (
          <p className="text-lg flex items-center gap-1 mt-5">
            <MdOutlineDateRange /> Note Added Date :
             {format(new Date(noteData?.note_added_date), "PP")}
          </p>
        ) : (
          ""
        )}
        <form onSubmit={handleAddNote} className="mt-2">
          <fieldset>
            <textarea
              name="note_dec"
              className="textarea textarea-lg h-52 w-full"
              placeholder="Write your note"
              defaultValue={noteData?.note_dec}
            ></textarea>
          </fieldset>
          <fieldset className="w-ful flex justify-end">
            <input
              type="submit"
              value="Add Note"
              className="btn bg-[#64b843] mt-2"
              disabled={user.email === userEmail ? false : true}
            />
          </fieldset>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default FoodDetails;
