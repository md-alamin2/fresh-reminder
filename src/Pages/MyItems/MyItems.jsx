import React, { Suspense } from "react";
import useAuth from "../../Hooks/useAuth";
import Loader from "../../Components/Laoder/Loader";
import MyItemList from "../../Components/MyItemList/MyItemList";
import useFoodApi from "../../Apis/useFoodApi";
import { motion } from "framer-motion";

const MyItems = () => {
  const { user } = useAuth();
  const { myItemsPromise } = useFoodApi();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-11/12 lg:container mx-auto my-20 md:min-h-[calc(100vh-530px)]"
    >
      <title>FreshReminder-my-items</title>
      <h2 className="text-4xl md:text-5xl font-bold text-center">
        My Added Items
      </h2>
      <p className="text-lg md:text-xl font-thin text-center mt-5 max-w-lg mx-auto">
        Here you can see how many food you added. Also update and delete your added food.
      </p>
      <Suspense fallback={<Loader></Loader>}>
        <MyItemList myItemsPromise={myItemsPromise(user.email)}></MyItemList>
      </Suspense>
    </motion.div>
  );
};

export default MyItems;
