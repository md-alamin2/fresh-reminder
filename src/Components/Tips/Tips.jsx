import React, { use } from "react";
import lightImg from "../../assets/imgs/light.png";

const tipsPromise = fetch("/tips.json").then((res) => res.json());

const Tips = () => {
  const tipsData = use(tipsPromise);

  return (
    <div className="mt-20 py-20 bg-base-200">
      <div className="w-11/12 lg:container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center">Food Management Tips</h2>
        <p className="text-lg md:text-xl font-thin text-center mt-5 max-w-lg mx-auto">
          Expert advice to help you make the most of your food inventory
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {tipsData.map((tips, index) => (
            <div key={index} className="bg-base-100 border border-gray-300 p-8 rounded-2xl">
              <div className="flex items-center gap-4">
                <img className="w-10" src={tips.icon} alt="" />
                <h3 className="text-lg font-bold">{tips.title}</h3>
              </div>
              <p className="mt-2">{tips.description}</p>
              <div className="mt-5 bg-base-200 p-4 rounded-2xl">
                <div className="flex items-center gap-2">
                  <img className="w-8" src={lightImg} alt="" />
                  <span className="text-sm font-bold">Pro Tips:</span>
                </div>
                <p className="font-thin mt-2">{tips.proTip}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tips;
