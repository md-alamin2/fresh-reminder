import React, { use, useEffect } from "react";
import {motion} from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const whyChosePromise = fetch("/WhyChose.json").then((res) => res.json());

const WhyChose = () => {
  const whyChoseData = use(whyChosePromise);
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <div className="w-11/12 lg:container mx-auto mt-30">
      <div 
      // data-aos="zoom-out" data-aos-duration="2000"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center">Why Choose FreshReminder Tracker?</h2>
      <p className="text-lg md:text-xl font-thin text-center mt-5 max-w-xl mx-auto">
        Powerful features designed to help you manage your food inventory
        efficiently
      </p>
      </div>
      <div className="grid gird-cols-1 md:grid-cols-2 gap-8 mt-10">
        {whyChoseData.map((data, index) => (
          <div key={index} 
          // data-aos="fade-up"
          >
            <motion.div whileHover={{scale:1.02}} className="bg-base-200 flex items-start gap-5 py-6 px-8 border border-gray-300 rounded-2xl hover:shadow-xl hover:transform hover:duration-200">
            <div>
              <img src={data.icon} alt="" />
            </div>
            <div>
              <h3 className="font-bold mb-3">{data.title}</h3>
              <p>{data.description}</p>
            </div>
          </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChose;
