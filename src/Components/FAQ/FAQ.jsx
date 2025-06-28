import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Aos from "aos";
import BlurText from "../../../Reactbits/BlurText/BlurText";

const FAQ = () => {
  const [faqData, setFaqDAta] = useState([]);

  useEffect(() => {
    fetch("/faq.json")
      .then((res) => res.json())
      .then((data) => setFaqDAta(data));

    Aos.init({ duration: 1000 });
  }, []);
  return (
    <div className="w-11/12 lg:container mx-auto mt-30 md:px-10 lg:px-40">
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
          <div
            key={index}
            className="collapse collapse-plus bg-base-100 border border-base-300 mt-1"
          >
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title font-semibold">{faq.question}</div>
            <div className="collapse-content text-sm">{faq.answer}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
