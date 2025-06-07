import React from "react";
import { format } from "date-fns";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";


const MyItemRow = ({ myItem }) => {
  const { title, img, expiryDate, quantity } = myItem || {};
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
        <button className="btn mr-2"><MdDeleteForever size={20}/></button>
        <button className="btn"><FaRegEdit size={20}/></button>
      </td>
    </tr>
  );
};

export default MyItemRow;
