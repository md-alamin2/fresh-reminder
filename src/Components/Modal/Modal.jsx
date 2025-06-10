import { format } from "date-fns-tz";
import React from "react";

const Modal = ({ myItem, handleUpdateFood }) => {
  const { _id, title, img, expiryDate, quantity, category, description } =
    myItem || {};
  
  return (
    <dialog id={`${_id}`} className="modal">
      <div className="modal-box text-start">
        <h3 className="text-3xl font-bold text-center mb-10">Update Food</h3>
        <form onSubmit={(e) => handleUpdateFood(e, _id)} method="dialog">
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
                defaultValue={title}
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
                defaultValue={quantity}
              />
            </fieldset>
            <fieldset className="fieldset rounded-box w-full">
              <label className=" text-xl">
                Category <sup className="text-red-500">*</sup>
              </label>
              <select
                name="category"
                className="select w-full"
                required
                defaultValue={category}
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
                  defaultValue={format(new Date(expiryDate), "yyyy-MM-dd")}
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
              defaultValue={img}
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
              defaultValue={description}
            ></textarea>
          </fieldset>

          <input
            type="submit"
            value="Update Food"
            className="btn w-full bg-[#64b843]"
          />
        </form>

        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
