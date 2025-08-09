import React, { useState } from "react";
import { format } from "date-fns";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Modal from "../Modal/Modal";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";
import { motion } from "framer-motion";

const MyItemRow = ({ myItem, handleDeleteFood }) => {
  const [items, setItems]= useState(myItem);
  const { _id, title, img, expiryDate, quantity} = items || {};
  const status = expiryDate > new Date()? "Fresh": "Expired"
  const axiosSecure= useAxiosSecure();

  const handleUpdateFood = (e, id) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const food = Object.fromEntries(formData.entries());

    // update food
    axiosSecure
      .put(`foods/${id}`, food)
      .then((data) => {
        if (data.data.modifiedCount) {
          setItems({...food, _id})
          document.getElementById(id).close();
          Swal.fire({
            title: "Food Update successfully!",
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
    <tr data-aos="fade-left" className="text-center">
      <td className="flex flex-col md:flex-row items-center gap-3">
        <img className="w-20 rounded-xl" src={img} alt="" />
        <h3 className="md:text-lg font-semibold">{title}</h3>
      </td>
      <td>
        <p className="font-bold">{quantity}</p>
      </td>
      <td>
        <p className={`badge ${status==="Fresh"? "badge-success":"badge-error"}`}>{status}</p>
      </td>
      <td>
        <p className="font-bold">{format(new Date(expiryDate), "P")}</p>
      </td>
      <td>
        <div className="flex flex-col md:flex-row gap-1 md:gap-2 justify-center">
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="btn btn-sm md:btn-md bg-[#64b843]"
            onClick={() => document.getElementById(_id).showModal()}
          >
            <FaEdit size={18} />
          </button>
          <button
            onClick={() => handleDeleteFood(_id)}
            className="btn btn-sm md:btn-md bg-[#64b843]"
          >
            <MdDeleteForever size={18} />
          </button>
        </div>
        <Modal items={items} handleUpdateFood={handleUpdateFood}></Modal>
      </td>
    </tr>
  );
};

export default MyItemRow;
