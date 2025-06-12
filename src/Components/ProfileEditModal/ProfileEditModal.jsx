import React from "react";

const ProfileEditModal = ({ user, handleProfile }) => {
  return (
    <div>
      <dialog id="profile_Modal" className="modal">
        <div className="modal-box">
              <h2 className="text-2xl font-bold text-center">
                Updated Profile
              </h2>
              <form onSubmit={(e) => handleProfile(e)} method="dialog">
                <img
                  className="w-24 mx-auto rounded-full bg-[#64b843] p-1"
                  src={user.photoURL}
                  alt=""
                />
                <fieldset className="fieldset">
                  {/* name */}
                  <label className="label text-xl font-semibold">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="input w-full py-5 bg-base-300"
                    defaultValue={user.displayName}
                    placeholder="Enter your name"
                    required
                  />
                  {/* photo url */}
                  <label className="label text-xl font-semibold mt-4">
                    Photo URL
                  </label>
                  <input
                    type="text"
                    name="photo"
                    className="input w-full py-5 bg-base-300"
                    defaultValue={user.photoURL}
                    placeholder="Enter your Photo URL"
                    required
                  />
                  <input
                    type="submit"
                    value="Update Profile"
                    className="btn w-full bg-[#64b843]"
                  />
                </fieldset>
              </form>
            
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ProfileEditModal;
