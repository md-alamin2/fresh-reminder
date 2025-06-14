import React from "react";
import Countdown from "react-countdown";
import { motion } from "framer-motion";

const CountDown = ({ expiryDate }) => {
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
        <motion.div
          initial={{ opacity: 0}}
          animate={{ opacity: 1}}
          transition={{ duration: 1 }}
          className="bg-base-200 rounded-2xl  md:px-6 py-8 mb-5"
        >
          <h2 className="text-3xl font-bold text-center mb-4">
            Food is Expired
          </h2>
          <div className="flex justify-center space-x-3 md:space-x-6">
            <div>
              <div className="text-2xl md:text-4xl font-bold text-white bg-[#64b843] py-1 px-2 rounded-lg inline">
                {(days = 0)}
              </div>
              <sub className="text-sm opacity-70 ml-1">days</sub>
            </div>
            <div>
              <div className="text-2xl md:text-4xl font-bold text-white bg-[#64b843] py-1 px-2 rounded-lg inline">
                {(hours = 0)}
              </div>
              <sub className="text-sm opacity-70 ml-1">hours</sub>
            </div>
            <div>
              <div className="text-2xl md:text-4xl font-bold text-white bg-[#64b843] py-1 px-2 rounded-lg inline">
                {(minutes = 0)}
              </div>
              <sub className="text-sm opacity-70 ml-1">minutes</sub>
            </div>
            <div>
              <div className="text-2xl md:text-4xl font-bold text-white bg-[#64b843] py-1 px-2 rounded-lg inline">
                {(seconds = 0)}
              </div>
              <sub className="text-sm opacity-70 ml-1">sec</sub>
            </div>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-base-200 rounded-2xl  md:px-6 py-8 mb-5"
      >
        <h2 className="text-3xl font-bold text-center mb-4">
          Food Will Expired IN
        </h2>
        <div className="flex justify-center space-x-2 md:space-x-6">
          <div>
            <div className="text-2xl md:text-4xl font-bold text-white bg-[#64b843] py-1 px-2 rounded-lg inline">
              {days}
            </div>
            <sub className="text-sm opacity-70 ml-1">days</sub>
          </div>
          <div>
            <div className="text-2xl md:text-4xl font-bold text-white bg-[#64b843] py-1 px-2 rounded-lg inline">
              {hours}
            </div>
            <sub className="text-sm opacity-70 ml-1">hours</sub>
          </div>
          <div>
            <div className="text-2xl md:text-4xl font-bold text-white bg-[#64b843] py-1 px-2 rounded-lg inline">
              {minutes}
            </div>
            <sub className="text-sm opacity-70 ml-1">minutes</sub>
          </div>
          <div>
            <div className="text-2xl md:text-4xl font-bold text-white bg-[#64b843] py-1 px-2 rounded-lg inline">
              {seconds}
            </div>
            <sub className="text-sm opacity-70 ml-1">sec</sub>
          </div>
        </div>
      </motion.div>
    );
  };

  return <Countdown date={new Date(expiryDate)} renderer={renderer} />;
};

export default CountDown;
