import React from 'react';
import Countdown from 'react-countdown';

const CountDown = ({expiryDate}) => {
     const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
      <div className="bg-base-200 rounded-box p-6 flex justify-center space-x-6 text-center mb-5">
        <div>
          <div className="text-4xl font-bold text-white bg-[#64b843] p-1 rounded-lg inline">{days=0}</div>
          <sub className="text-sm opacity-70 ml-1">days</sub>
        </div>
        <div>
          <div className="text-4xl font-bold text-white bg-[#64b843] p-1 rounded-lg inline">{hours=0}</div>
          <sub className="text-sm opacity-70 ml-1">hours</sub>
        </div>
        <div>
          <div className="text-4xl font-bold text-white bg-[#64b843] p-1 rounded-lg inline">{minutes=0}</div>
          <sub className="text-sm opacity-70 ml-1">minutes</sub>
        </div>
        <div>
          <div className="text-4xl font-bold text-white bg-[#64b843] p-1 rounded-lg inline">{seconds=0}</div>
          <sub className="text-sm opacity-70 ml-1">sec</sub>
        </div>
      </div>
    );
    }

    return (
      <div className="bg-base-200 rounded-box px-6 py-8 flex justify-center space-x-6 text-center mb-5">
        <div>
          <div className="text-4xl font-bold text-white bg-[#64b843] p-1 rounded-lg inline">{days}</div>
          <sub className="text-sm opacity-70 ml-1">days</sub>
        </div>
        <div>
          <div className="text-4xl font-bold text-white bg-[#64b843] p-1 rounded-lg inline">{hours}</div>
          <sub className="text-sm opacity-70 ml-1">hours</sub>
        </div>
        <div>
          <div className="text-4xl font-bold text-white bg-[#64b843] p-1 rounded-lg inline">{minutes}</div>
          <sub className="text-sm opacity-70 ml-1">minutes</sub>
        </div>
        <div>
          <div className="text-4xl font-bold text-white bg-[#64b843] p-1 rounded-lg inline">{seconds}</div>
          <sub className="text-sm opacity-70 ml-1">sec</sub>
        </div>
      </div>
    );
  };

  return (
    <Countdown date={new Date(expiryDate)} renderer={renderer} />
  );
}

export default CountDown;