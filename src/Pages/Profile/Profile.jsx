import React, { useEffect } from "react";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "aos/dist/aos.css";
import Aos from "aos";
import { FaEdit } from "react-icons/fa";
import ProfileEditModal from "../../Components/ProfileEditModal/ProfileEditModal";
import userImg from "../../assets/imgs/user.png";
import { motion } from "framer-motion";

const Profile = () => {
  const { user, updateUser, setUser, setLoading } = useAuth();

  const handleProfile = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;

    updateUser({ displayName: name, photoURL: photo })
      .then(() => {
        setUser({ ...user, displayName: name, photoURL: photo });
        Swal.fire({
          title: "Profile Update successfully!",
          icon: "success",
          timer: 2000,
        });
        setLoading(false);
        document.getElementById("profile_Modal").close();
      })
      .catch((error) => {
        setUser(user);
        toast.error(`${error.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <motion.div initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:0.4}} className="mt-20 md:h-[calc(100vh-455px)]">
      <title>user-profile</title>
      <div className="border border-gray-300 max-w-200 mx-auto px-4 py-8 text-center shadow-xl rounded-lg ">
        <div
          className="h-32  rounded-lg"
          style={{
            backgroundImage:
              "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
          }}
        >
        </div>
         <img
            className="w-22 mx-auto -mt-14 rounded-full"
            src={user.photoURL || userImg}
            alt=""
          />
        <h3 className="text-2xl font-bold mt-5">Name: {user.displayName}</h3>
        <p className="text-lg font-medium">Email: {user.email}</p>
        <button
          onClick={() => document.getElementById("profile_Modal").showModal()}
          className="btn bg-[#64b843] mt-5"
        >
          Update-profile <FaEdit size={20} />
        </button>
        <ProfileEditModal
          user={user}
          handleProfile={handleProfile}
        ></ProfileEditModal>
      </div>
    </motion.div>
  );
};

export default Profile;
