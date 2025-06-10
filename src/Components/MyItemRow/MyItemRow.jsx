import React from "react";
import { format } from "date-fns";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
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
          document.getElementById(id).close()
          Swal.fire({
            title: "Food Update successfully!",
            icon: "success",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <tr className="text-center">
      <td className="flex items-center gap-3">
        <img className="w-20 rounded-2xl" src={img} alt="" />
        <h3 className="text-lg font-semibold">{title}</h3>
      </td>
      <td>
        <p className="font-bold">{quantity}</p>
      </td>
      <td>
        <p className="font-bold">{format(new Date(expiryDate), "P")}</p>
      </td>
      <td>
        <button onClick={() => handleDeleteFood(_id)} className="btn mr-2">
          <MdDeleteForever size={20} />
        </button>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button
          className="btn"
          onClick={() => document.getElementById(_id).showModal()}
        >
          <FaRegEdit size={20} />
        </button>
        <Modal myItem={myItem} handleUpdateFood={handleUpdateFood}></Modal>
      </td>
    </tr>
  );
};

export default MyItemRow;
