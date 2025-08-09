import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Aos from "aos";
import BlurText from "../../../Reactbits/BlurText/BlurText";
import { motion } from "framer-motion";
import Loader from "../../Components/Laoder/Loader";

const FAQ = () => {
  const [faqData, setFaqDAta] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/faq.json")
      .then((res) => res.json())
      .then((data) => {
        setFaqDAta(data);
        setLoading(false);
      });

    Aos.init({ duration: 1000 });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if(loading) return <Loader/>
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-11/12 lg:container mx-auto mt-20 md:px-10 lg:px-40"
    >
      <div>
        <div className="ml-4 md:ml-0">
          <h2 className="w-full text-center">
            <BlurText
              text="Common Questions"
              delay={800}
              animateBy="words"
              direction="Bottom"
              className="text-4xl md:text-5xl font-bold text-center max-w-[460px] mx-auto"
            />
          </h2>
        </div>
        <p className="text-lg md:text-xl font-thin text-center mt-5 max-w-xl mx-auto">
          Find quick answers to common questions about using our Fresh Reminder
          to manage and reduce your food waste.
        </p>
      </div>
      <div className="mt-10">
        {faqData.map((faq, index) => (
          <motion.div key={index} variants={itemVariants}>
            <div className="collapse collapse-plus bg-base-100 border border-base-300 mt-1">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title font-semibold">{faq.question}</div>
              <div className="collapse-content text-sm">{faq.answer}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default FAQ;
