import React from "react";
import { format } from "date-fns";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Modal from "../Modal/Modal";
import axios from "axios";
import Swal from "sweetalert2";

const MyItemRow = ({ myItem, handleDeleteFood }) => {
  const { _id, title, img, expiryDate, quantity } = myItem || {};

  const handleUpdateFood = (e, id) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const food = Object.fromEntries(formData.entries());

    // update food
    axios
      .put(`http://localhost:3000/foods/${id}`, food)
      .then((data) => {
        if (data.data.modifiedCount) {
          document.getElementById(id).close();
          Swal.fire({
            title: "Food Update successfully!",
            icon: "success",
            timer:2000
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <tr className="text-center">
      <td className="flex flex-col md:flex-row items-center gap-3">
        <img className="w-20 rounded-xl" src={img} alt="" />
        <h3 className="md:text-lg font-semibold">{title}</h3>
      </td>
      <td>
        <p className="font-bold">{quantity}</p>
      </td>
      <td>
        <p className="font-bold">{format(new Date(expiryDate), "P")}</p>
      </td>
      <td>
        <div className="flex flex-col md:flex-row gap-1 md:gap-2 justify-center">
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="btn btn-md"
            onClick={() => document.getElementById(_id).showModal()}
          ><FaEdit size={18} /></button>
          <button
            onClick={() => handleDeleteFood(_id)}
            className="btn btn-md"
          ><MdDeleteForever size={18} /></button>
        </div>
        <Modal myItem={myItem} handleUpdateFood={handleUpdateFood}></Modal>
      </td>
    </tr>
  );
};

export default MyItemRow;
