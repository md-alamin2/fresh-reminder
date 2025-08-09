import { useEffect, useState } from "react";
import avFoodImg from "../../assets/imgs/items.png";
import exFoodImg from "../../assets/imgs/expired.png";
import neExFoodImg from "../../assets/imgs/expireing soon.png";
import myItemsImg from "../../assets/imgs/myItem.png";
import CountUp from "react-countup";
import Loader from "../../Components/Laoder/Loader";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useNavigate } from "react-router";
import { FaArrowRight } from "react-icons/fa";

ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardStats = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);

  // Fetch all data
  const { data: foods = [], isLoading } = useQuery({
    queryKey: ["foods", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`foods`);
      return res.data;
    },
    enabled: user?.email === "alamin@gmail.com",
  });

  const { data: expiringSoon = [], isLoading: isExpiringSoon } = useQuery({
    queryKey: ["expiringSoon", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`food/expiring-soon`);
      return res.data;
    },
    enabled: user?.email === "alamin@gmail.com",
  });

  const { data: expired = [], isLoading: isExpired } = useQuery({
    queryKey: ["expired", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`expired`);
      return res.data;
    },
    enabled: user?.email === "alamin@gmail.com",
  });

  const { data: myItems = [], isLoading: isMyItems } = useQuery({
    queryKey: ["food", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`food?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: myExpiredItems = [], isLoading: isMyExpiredItems } = useQuery({
    queryKey: ["myExpired", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`expired?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: myExSoonItems = [], isLoading: isMyExSoonItems } = useQuery({
    queryKey: ["myExSoon", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `food/expiring-soon?email=${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Chart data for Expiry Status
  const expiryData = {
    labels: ["Fresh", "Expiring Soon", "Expired"],
    datasets: [
      {
        data: [
          user.email === "alamin@gmail.com"
            ? foods.length - expiringSoon.length - expired.length
            : myItems.length - myExSoonItems.length - myExpiredItems.length,
          user.email === "alamin@gmail.com"
            ? expiringSoon.length
            : myExSoonItems.length,
          user.email === "alamin@gmail.com"
            ? expired.length
            : myExpiredItems.length,
        ],
        backgroundColor: ["#78db51", "#f8d66d", "#f87171"],
        borderWidth: 0,
      },
    ],
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const getMotivationalMessage = () => {
    if (!myItems.length) return "Add your first food item to get started!";
    if (myExpiredItems.length === 0 && myExSoonItems.length === 0) {
      return "Perfect! No waste detected. Keep it up!";
    }
    if (myExpiredItems.length > 5) {
      return `You have ${expired.length} expired items. Time to clean up!`;
    }
    if (expiringSoon.length > 3) {
      return `${myExSoonItems.length} items expiring soon. Plan your meals!`;
    }
    return "You're doing great! Keep managing your food wisely.";
  };

  const cardClass =
    "border border-gray-300 rounded-lg p-5 flex flex-col items-center text-center gap-4 cursor-pointer transition-all duration-300";

  const handleCardClick = (filter) => {
    navigate(`${filter}`);
  };

  if (
    isLoading ||
    isExpired ||
    isExpiringSoon ||
    isMyItems ||
    isMyExSoonItems ||
    isMyExpiredItems ||
    !isMounted
  ) {
    return <Loader />;
  }

  return (
    <div className="w-11/12 lg:container mx-auto mb-10">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header with personalized greeting */}
          <div className="text-center mt-10 mb-8">
            <motion.h2
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="text-4xl md:text-5xl font-bold"
            >
              {getGreeting()}, {user?.displayName?.split(" ")[0]}!
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg mt-2 text-gray-600"
            >
              {getMotivationalMessage()}
            </motion.p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {/* Total Items */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
              }}
              className={`${cardClass} bg-[#78db51] shadow-md`}
              onClick={() => handleCardClick("/fridge")}
            >
              <img className="w-12 h-12" src={avFoodImg} alt="Total Items" />
              <div>
                <h3 className="text-2xl font-bold">
                  <CountUp start={0} end={foods.length} duration={1.5} />
                </h3>
                <p className="text-sm font-semibold">Total Items</p>
              </div>
              <div className="flex items-center text-xs mt-2 text-gray-700">
                View all <FaArrowRight className="ml-1" />
              </div>
            </motion.div>

            {/* My Added Items */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
              }}
              className={`${cardClass} bg-[#78db51] shadow-md`}
              onClick={() => handleCardClick("/dashboard/my-items")}
            >
              <img className="w-12 h-12" src={myItemsImg} alt="My Items" />
              <div>
                <h3 className="text-2xl font-bold">
                  <CountUp start={0} end={myItems.length} duration={1.5} />
                </h3>
                <p className="text-sm font-semibold">My Added Items</p>
                <div className="flex items-center text-xs mt-2 text-gray-700">
                  View My Items <FaArrowRight className="ml-1" />
                </div>
              </div>
            </motion.div>

            {/* Expired Items */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
              }}
              className={`${cardClass} bg-red-100 shadow-md`}
            >
              <img className="w-12 h-12" src={exFoodImg} alt="Expired Items" />
              <div>
                <h3 className="text-2xl font-bold">
                  {user.email === "alamin@gmail.com" ? (
                    <CountUp start={0} end={expired.length} duration={1.5} />
                  ) : (
                    <CountUp
                      start={0}
                      end={myExpiredItems.length}
                      duration={1.5}
                    />
                  )}
                </h3>
                <p className="text-sm font-semibold">Expired Items</p>
              </div>
              {expired.length > 0 ||
                (myExpiredItems.length > 0 && (
                  <div className="w-full bg-red-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-red-500 h-2 rounded-full"
                      style={{
                        width: `${Math.min(
                          100,
                          (user.email === "alamin@gmail.com"
                            ? expired.length / foods.length
                            : myExpiredItems.length / myItems.length) * 100
                        )}%`,
                      }}
                    ></div>
                  </div>
                ))}
            </motion.div>

            {/* Expiring Soon */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
              }}
              className={`${cardClass} bg-yellow-100 shadow-md`}
            >
              <img
                className="w-12 h-12"
                src={neExFoodImg}
                alt="Expiring Soon"
              />
              <div>
                <h3 className="text-2xl font-bold">
                  {user.email === "alamin@gmail.com" ? (
                    <CountUp
                      start={0}
                      end={expiringSoon.length}
                      duration={1.5}
                    />
                  ) : (
                    <CountUp
                      start={0}
                      end={myExSoonItems.length}
                      duration={1.5}
                    />
                  )}
                </h3>
                <p className="text-sm font-semibold">Expiring Soon</p>
              </div>
              <div className="w-16 h-16 mt-2">
                {expiryData.length > 0 && (
                  <Doughnut data={expiryData} options={{ cutout: "70%" }} />
                )}
              </div>
            </motion.div>
          </div>

          {/* Additional Insights Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-base-100 p-6 rounded-xl shadow-md mb-10"
          >
            <h3 className="text-xl font-bold mb-4">Your Food Insights</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Inventory Composition</h4>
                <div className="h-64">
                  {myItems.length === 0 ? (
                    <p className="flex justify-center pt-10 text-lg font-bold">
                      Add your first food item to get started!
                    </p>
                  ) : (
                    <Doughnut
                      data={expiryData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: { position: "bottom" },
                        },
                      }}
                    />
                  )}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Quick Actions</h4>
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate("/dashboard/add-food")}
                    className="w-full btn btn-primary text-white"
                  >
                    Add New Food Item
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCardClick("/dashboard/my-items")}
                    className="w-full btn btn-warning"
                  >
                    Plan Meals with Expiring Items
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCardClick("/dashboard/my-items")}
                    className="w-full btn btn-error"
                  >
                    Manage Expired Items
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default DashboardStats;
