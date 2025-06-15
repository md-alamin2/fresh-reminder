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
import { motion } from "framer-motion";
import NoteModal from "../../Components/NoteModal/NoteModal";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";

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
  const currentDay = new Date().toISOString();
  singleFood.expiryDate = new Date(expiryDate).toISOString();
  const axiosSecure = useAxiosSecure();

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
    axiosSecure
      .patch(
        `foods/${_id}`,
        noteData
      )
      .then((data) => {
        if (data.data.modifiedCount) {
          setNoteData(noteData);
          form.reset();
          document.getElementById("my_modal_3").close();
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
    <>
    <title>FreshReminder-food-details</title>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-11/12 lg:container mx-auto mt-20"
      >
        <CountDown expiryDate={expiryDate}></CountDown>
        <div className="flex flex-col md:flex-row items-center gap-6 border border-gray-300 p-4 rounded-2xl">
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
                  currentDay >= expiryDate ? "badge-error" : "badge-success"
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
        <div className="mt-8">
          <h3 className="text-xl font-semibold">Note:</h3>
          <div className="card max-w-96 bg-base-100 card-xs shadow-sm border border-gray-300 mt-5">
            <div className="card-body">
              {noteData ? (
                <>
                  <p className="text-sm flex items-center gap-1">
                    <MdOutlineDateRange />
                    {format(new Date(noteData?.note_added_date), "PP")}
                  </p>
                  <p className="text-base font-thin opacity-70">
                    {noteData?.note_dec}
                  </p>
                </>
              ) : (
                <h2 className="text-lg font-bold">Note isn't added yet🔍</h2>
              )}
              {/* You can open the modal using document.getElementById('ID').showModal() method */}
              <div className="flex justify-end">
                <button
                  disabled={user.email === userEmail ? false : true}
                  className="btn bg-[#64b843]"
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                >
                  Add Note
                </button>
                <NoteModal
                  userEmail={userEmail}
                  handleAddNote={handleAddNote}
                ></NoteModal>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default FoodDetails;
