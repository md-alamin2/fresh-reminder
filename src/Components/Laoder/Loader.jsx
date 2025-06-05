import React from 'react';
import loading from "../../assets/Lottis/as-11-loader.json"
import Lottie from "lottie-react";

const Loader = () => {
    return (
        <div className="min-h-screen flex justify-center items-center">
        {/* <span className="loading loading-bars loading-xl"></span> */}
        <Lottie animationData={loading}></Lottie>
      </div>
    );
  };


export default Loader;