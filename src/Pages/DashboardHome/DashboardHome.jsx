import { use, useEffect, useState } from "react";
import avFoodImg from "../../assets/imgs/items.png";
import exFoodImg from "../../assets/imgs/expired.png";
import neExFoodImg from "../../assets/imgs/expireing soon.png";
import myItemsImg from "../../assets/imgs/myItem.png";
import CountUp from "react-countup";
import Loader from "../../Components/Laoder/Loader";
import { motion } from "framer-motion";
import useFoodApi from "../../Apis/useFoodApi";
import useAuth from "../../Hooks/useAuth";
import Profile from "../Profile/Profile";

const DashboardStats = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [expired, setExpired] = useState(0);
  const [expiringSoon, setExpiringSoon] = useState(0);
  const [myItems, SetMyItems] = useState(0);
  const { myItemsPromise } = useFoodApi();

  useEffect(() => {
    setLoading(true);
    fetch("https://ph-assignment-11-server-omega.vercel.app/foods")
      .then((res) => res.json())
      .then((data) => setTotal(data.length));

    fetch("https://ph-assignment-11-server-omega.vercel.app/expired")
      .then((res) => res.json())
      .then((data) => setExpired(data.length));

    fetch("https://ph-assignment-11-server-omega.vercel.app/food/expiring-soon")
      .then((res) => res.json())
      .then((data) => setExpiringSoon(data.length));

    myItemsPromise(user.email)
      .then((res) => res)
      .then((data) => SetMyItems(data.length), setLoading(false));
  }, [user, myItems, myItemsPromise]);

  const cardClass =
    "border border-gray-300 shadow-sm rounded-lg p-5 flex flex-col items-center text-center gap-4 shadow hover:shadow-xl duration-300 transition";

  return (
    <div className="w-11/12 lg:container mx-auto mb-10">
      {loading ? (
        <Loader></Loader>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mt-10">
            Stats
          </h2>
          <div className=" mt-10 grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {/* Total Items */}
            <div className={`${cardClass} bg-[#78db51]`}>
              <img className="w-15" src={avFoodImg} alt="" />
              <div>
                <h3 className="text-xl font-bold">
                  <CountUp start={0} duration={2} end={total}></CountUp>
                </h3>
                <p className="text-sm font-semibold">Total Items</p>
              </div>
            </div>

            {/* My Added Items */}
            <div className={`${cardClass} bg-[#78db51]`}>
              <img className="w-15" src={myItemsImg} alt="" />
              <div>
                <h3 className="text-xl font-bold">
                  <CountUp start={0} duration={2} end={myItems}></CountUp>
                </h3>
                <p className="text-sm font-semibold ">My Added Items</p>
              </div>
            </div>

            {/* Expired Items */}
            <div className={`${cardClass} bg-red-200`}>
              <img className="w-15" src={exFoodImg} alt="" />
              <div>
                <h3 className="text-xl font-bold">
                  <CountUp start={0} duration={2} end={expired}></CountUp>
                </h3>
                <p className="text-sm font-semibold ">Expired Items</p>
              </div>
            </div>

            {/* Expiring Soon */}
            <div className={`${cardClass} bg-yellow-200`}>
              <img className="w-15" src={neExFoodImg} alt="" />
              <div>
                <h3 className="text-xl font-bold">
                  <CountUp start={0} duration={2} end={expiringSoon}></CountUp>
                </h3>
                <p className="text-sm font-semibold">Expiring Soon</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      <Profile></Profile>
    </div>
  );
};

export default DashboardStats;
