import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";

const Impact = ({ nearlyExpiredData, expired }) => {
  const nearlyExpiredCount = nearlyExpiredData.length;

  const expiredCount = expired.length;

  return (
    <div className="w-11/12 lg:container mx-auto mt-20 md:px-10 lg:px-40">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center">
          Making a Real Impact
        </h2>
        <p className="text-lg md:text-xl font-thin text-center mt-5 max-w-lg mx-auto">
          See how our community is actively reducing food waste and saving money
        </p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {/* Expired Items */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-6 py-20 text-center shadow-sm"
        >
          <h2 className="text-4xl font-semibold mb-2">Expired Items</h2>
          <p className="text-5xl font-bold">
            <CountUp
              duration={2}
              start={0}
              enableScrollSpy={true}
              end={expiredCount}
            />
          </p>
          <p className="mt-1 text-xl">Items past expiry date</p>
        </motion.div>

        {/* Nearly Expiring Items */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          // data-aos="fade-left"
          className="bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-xl px-6 py-20 text-center shadow-sm"
        >
          <h2 className="text-4xl font-semibold mb-2">Nearly Expiring</h2>
          <p className="text-5xl font-bold">
            <CountUp
              duration={2}
              start={0}
              enableScrollSpy={true}
              end={nearlyExpiredCount}
            />
          </p>
          <p className="mt-1 text-xl">Items expiring within 5 days</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Impact;
