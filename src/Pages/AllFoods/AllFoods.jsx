import React, { useEffect } from "react";
import useAuth from "../../Hooks/useAuth";
import Loader from "../../Components/Laoder/Loader";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import AllFoodList from "../../Components/AllFoodList/AllFoodList";

const AllFoods = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all data
  const { data: foods, isLoading } = useQuery({
    queryKey: ["foods", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`foods`);
      return res.data;
    },
    enabled: user?.email === "alamin@gmail.com",
  });

  // Delete member mutation
  const { mutate: deleteFood } = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`foods/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["foods"]);
      toast.success("Food delete successfully");
    },
    onError: () => {
      toast.error("Failed to delete food");
    },
  });

  // delete added food
  const handleDeleteFood = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFood(id);
      }
    });
  };

  if(isLoading) return <Loader></Loader>

  

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-11/12 lg:container mx-auto my-20 md:min-h-[calc(100vh-530px)]"
    >
      <title>FreshReminder-All Foods</title>
      <h2 className="text-4xl md:text-5xl font-bold text-center">
        All foods
      </h2>
      <AllFoodList foods={foods} handleDeleteFood={handleDeleteFood}></AllFoodList>
    </motion.div>
  );
};

export default AllFoods;
