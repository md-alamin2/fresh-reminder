import React from "react";
import {motion} from "framer-motion"

const NoteModal = ({ handleAddNote }) => {
  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Write your note:</h3>
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="bg-base-200 rounded-2xl p-3 md:p-6 mt-3"
        >
          <form onSubmit={handleAddNote} className="mt-2">
            <fieldset>
              <textarea
                name="note_dec"
                className="textarea textarea-lg h-52 w-full"
                placeholder="Write your note"
              ></textarea>
            </fieldset>
            <fieldset className="w-ful flex justify-end">
              <input
                type="submit"
                value="Add Note"
                className="btn bg-[#64b843] mt-2"
              />
            </fieldset>
          </form>
        </motion.div>
        </div>
      </dialog>
    </div>
  );
};

export default NoteModal;
