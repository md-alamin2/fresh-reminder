import React from "react";
import axios from "axios";
import useAuth from "./useAuth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
});

const useAxiosSecure = () => {
  const { user, logoutUser } = useAuth();

  // axios request instance
  axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${user.accessToken}`;
    return config;
  });
  // axios response instance
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.status === 401 || error.status === 403) {
        logoutUser()
          .then(() => {
            Swal.fire({
              title: "Logout!",
              text: `Logout user for ${error.status} status code`,
              icon: "success",
            });
          })
          .catch((error) => {
            const errorMessage = error.status;
            toast.error(`Login failed ${errorMessage}`, {
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
      }
    }
  );

  return axiosInstance;
};

export default useAxiosSecure;
