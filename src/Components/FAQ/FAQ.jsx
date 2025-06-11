import React, { useEffect, useState } from "react";

const FAQ = () => {
  const [faqData, setFaqDAta] = useState([]);
  console.log(faqData);

  useEffect(() => {
    fetch("/faq.json")
      .then((res) => res.json())
      .then((data) => setFaqDAta(data));
  }, []);
  return (
    <div className="w-11/12 lg:container mx-auto mt-30 ">
      <h2 className="text-5xl font-bold text-center">FAQ Section</h2>
      <p className="text-xl font-thin text-center mt-5 max-w-xl mx-auto">
        Find quick answers to common questions about using our Fresh Reminder to
        manage and reduce your food waste.
      </p>
      <div className="mt-10">
        {faqData.map((faq) => (
          <div className="collapse collapse-plus bg-base-100 border border-base-300 mt-1">
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
