import React from "react";
import useAxiosSecure from "../Hooks/UseAxiosSecure";


const useFoodApi = () => {
  const axiosSecure = useAxiosSecure()

  const myItemsPromise = (email) => {
    return axiosSecure.get(`food?email=${email}`).then((res) => res.data);
  };
  return {
    myItemsPromise
  }
};

export default useFoodApi;
