import React, { useEffect, useState } from "react";
import { FaUsers, FaLeaf, FaGlobe, FaChartLine } from "react-icons/fa";
import Loader from "../Laoder/Loader";
import CountUp from "react-countup";

const iconMap = {
  FaUsers: <FaUsers size={32} />,
  FaLeaf: <FaLeaf size={32} />,
  FaGlobe: <FaGlobe size={32} />,
  FaChartLine: <FaChartLine size={32} />,
};

const Stats = () => {
  const [statsData, setStatsData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/stateData.json")
      .then((res) => res.json())
      .then((data) => {
        setStatsData(data);
        setLoading(false);
      });
  }, []);
  return (
    <section className="py-10 bg-base-100">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {loading ? (
          <Loader></Loader>
        ) : (
          statsData.map((stat) => (
            <div
              key={stat.id}
              className="bg-base-100 shadow-sm border border-gray-300 rounded-lg p-6 text-center hover:shadow-xl hover:scale-105 duration-300 transition"
            >
              <div className={`mb-2 flex justify-center ${stat.color}`}>
                {iconMap[stat.icon]}
              </div>
              <h3 className="text-2xl font-bold">{stat.id==4&&"$"}<CountUp
              duration={2}
              start={0}
              enableScrollSpy={true}
              end={stat.value}
            />{stat.id==3?" Tons":"+"}</h3>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Stats;
