import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import AOS from "aos";
import "aos/dist/aos.css";
import Aos from "aos";

const Impact = ({ nearlyExpiredData, expired }) => {
  const nearlyExpiredCount = nearlyExpiredData.length;
  

  const expiredCount = expired.length;

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div className="w-11/12 lg:container mx-auto mt-30 md:px-10 lg:px-40">
      <div 
      // data-aos="zoom-out" data-aos-duration="2000"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center">
          Making a Real Impact
        </h2>
        <p className="text-lg md:text-xl font-thin text-center mt-5 max-w-lg mx-auto">
          See how our community is actively reducing food waste and saving money
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {/* Expired Items */}
        <div
          // data-aos="fade-right"
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
        </div>

        {/* Nearly Expiring Items */}
        <div
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
        </div>
      </div>
    </div>
  );
};

export default Impact;
