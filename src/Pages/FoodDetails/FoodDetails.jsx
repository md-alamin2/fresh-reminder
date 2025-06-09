import { format } from "date-fns";
import React from "react";
import { useLoaderData } from "react-router";
import axios from "axios";
import useAuth from "../../Hooks/useAuth";
import CountDown from "../../Components/CountDown/CountDown";

const FoodDetails = () => {
  const {user}=useAuth();
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
    userEmail
  } = singleFood || {};
  const currentDay= new Date();
  singleFood.expiryDate=(new Date(expiryDate))

  // add note to db
  const handleAddNote = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const newNote = Object.fromEntries(formData.entries());
    const noteData = {
      note_title: newNote.note_title,
      note_dec: newNote.note_dec,
    };
    // update note on db
    axios
      .patch(`http://localhost:3000/foods/${_id}`, noteData)
      .then((data) => {
        console.log(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="w-11/12 lg:container mx-auto mt-20">
      <CountDown expiryDate={expiryDate}></CountDown>
      <div className="flex items-center gap-6 border border-gray-300 p-4 rounded-2xl">
        <div>
          <img className="w-96 rounded-lg" src={img} alt="" />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Name : {title}</h2>
          <p className="text-lg">Category : {category}</p>
          <p className="text-lg">Quantity : {quantity}</p>
          <p className="text-lg">
            Added Date : {format(new Date(addedDate), "P")}
          </p>
          <p className="text-lg">
            Expiry Date : {format(new Date(expiryDate), "P")}
          </p>
          <p className="text-lg border-t border-b border-dashed my-2 py-4">
            Status :{" "}
            <span className={`badge font-semibold ${currentDay>expiryDate?"badge-error": "badge-success"}`}>{currentDay>expiryDate? "Expired": "Fresh"}</span>
          </p>
          <p className="text-lg">
            Description:{" "}
            <span className="text-sm font-thin">{description}</span>
          </p>
        </div>
      </div>

      <div className="bg-base-200 rounded-2xl p-6 mt-8">
        <h3 className="text-xl font-semibold">Notes:</h3>
        <form onSubmit={handleAddNote} className="mt-4">
          <fieldset>
            <input
              type="text"
              name="note_title"
              className="input input-lg w-full"
              placeholder="Note Title"
              defaultValue={singleFood?.noteData?.note_title}
            />
          </fieldset>
          <fieldset>
            <textarea
              name="note_dec"
              className="textarea textarea-lg h-52 w-full mt-6"
              placeholder="Write your note"
              defaultValue={singleFood?.noteData?.note_dec}
            ></textarea>
          </fieldset>
          <fieldset className="w-ful flex justify-end">
            <input type="submit" value="Save Note" className="btn mt-4" disabled={user.email ===userEmail? false: true } />
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default FoodDetails;
