import React, { use } from "react";
import { motion } from "framer-motion";

const whyChosePromise = fetch("/WhyChose.json").then((res) => res.json());

const WhyChose = () => {
  const whyChoseData = use(whyChosePromise);
  return (
    <div className="w-11/12 lg:container mx-auto mt-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease:"easeOut" }}
        viewport={{once:true}}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center">
          Why Choose FreshReminder Tracker?
        </h2>
        <p className="text-lg md:text-xl font-thin text-center mt-5 max-w-xl mx-auto">
          Powerful features designed to help you manage your food inventory
          efficiently
        </p>
      </motion.div>
      <div className="grid gird-cols-1 md:grid-cols-2 gap-8 mt-10">
        {whyChoseData.map((data, index) => (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{once:true}}
            key={index}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-base-200 flex items-start gap-5 py-6 px-8 border border-gray-300 rounded-2xl hover:shadow-xl hover:transform hover:duration-200"
            >
              <div>
                <img className="w-15" src={data.icon} alt="" />
              </div>
              <div>
                <h3 className="font-bold mb-3">{data.title}</h3>
                <p>{data.description}</p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WhyChose;
