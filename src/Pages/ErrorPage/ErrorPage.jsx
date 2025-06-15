import React from "react";
import Lottie from "lottie-react";
import lottie404 from "../../assets/Lottis/404-page.json";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="md:min-h-screen max-w-screen relative overflow-hidden">
      <Lottie animationData={lottie404} style={{ height: 500 }}></Lottie>
      <div className="absolute top-3/4 md:top-2/4 left-[calc(1/2*100%-55px)] w-full">
        <h1 className="text-4xl font-bold relative -left-32 md:-left-30">
          404 Page Not Found!!
        </h1>
        <Link to="/" className="btn bg-[#64b843] mt-5">
          Back To Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
