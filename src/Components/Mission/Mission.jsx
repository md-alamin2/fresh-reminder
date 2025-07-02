import React, { useEffect, useState } from "react";
import { FaHeart, FaLightbulb, FaMedal, FaGlobe } from "react-icons/fa";
import Loader from "../Laoder/Loader";

const iconMap = {
  FaHeart: <FaHeart size={28} />,
  FaLightbulb: <FaLightbulb size={28} />,
  FaMedal: <FaMedal size={28} />,
  FaGlobe: <FaGlobe size={28} />,
};

const Mission = () => {
  const [missionData, setMissionData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/missionData.json")
      .then((res) => res.json())
      .then((data) => {
        setMissionData(data);
        setLoading(false);
      });
  }, []);
  return (
    <section className="py-12 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8">
        {/* Left Text Content */}
        <div>
          <span className="text-sm bg-base-200 px-3 py-1 rounded-full font-medium inline-block mb-2">
            Our Mission
          </span>
          <h2 className="text-3xl font-bold mb-4 leading-snug">
            Making Food Waste Reduction <br className="hidden sm:block" />{" "}
            Accessible to Everyone
          </h2>
          <p className=" mb-4">
            Every year, approximately 1.3 billion tons of food is wasted
            globally, contributing to climate change and economic loss. We
            believe technology can help solve this problem.
          </p>
          <p className="">
            Our platform empowers individuals and families to track their food
            inventory, receive smart alerts, and make informed decisions about
            consumption, ultimately reducing waste and saving money. Through
            community features and data insights, we're building a movement of
            conscious consumers who care about sustainability and responsible
            food management.
          </p>
        </div>

        {/* Right Feature Boxes */}
        <div className="grid sm:grid-cols-2 gap-4">
          {loading?<Loader></Loader>:missionData.map((item) => (
            <div
              key={item.id}
              className="bg-base-100 border border-gray-300 rounded-lg p-5 flex flex-col items-start gap-2 shadow-sm hover:shadow-xl hover:scale-105 duration-300 transition"
            >
              <div className={`text-2xl ${item.color}`}>
                {iconMap[item.icon]}
              </div>
              <h4 className="text-md font-semibold">{item.title}</h4>
              <p className="text-sm ">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mission;
