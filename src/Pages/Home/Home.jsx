import React, { Suspense, useEffect, useState } from "react";
import Slider from "../../Components/Slider/Slider";
import Loader from "../../Components/Laoder/Loader";
import WhyChose from "../../Components/WhyChose/WhyChose";
import Tips from "../../Components/Tips/Tips";
import NearlyExpired from "../../Components/NearlyExpired/NearlyExpired";
import { useLoaderData } from "react-router";
import ExpiredFood from "../../Components/ExpiredFood/ExpiredFood";
import FAQ from "../../Components/FAQ/FAQ";
import Impact from "../../Components/Impact/Impact";

const Home = () => {
  const nearlyExpiredData = useLoaderData();
  const [expired, setExpired] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://ph-assignment-11-server-omega.vercel.app/expired")
      .then((res) => res.json())
      .then((data) => {
        setExpired(data);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <Suspense fallback={<Loader></Loader>}>
        <Slider></Slider>
      </Suspense>
      {loading ? (
        <Loader></Loader>
      ) : (
        <Impact
          nearlyExpiredData={nearlyExpiredData}
          expired={expired}
        ></Impact>
      )}
      <NearlyExpired nearlyExpiredData={nearlyExpiredData}></NearlyExpired>
      <ExpiredFood expired={expired}></ExpiredFood>
      <Suspense fallback={<Loader></Loader>}>
        <WhyChose></WhyChose>
      </Suspense>
      <Suspense>
        <Tips></Tips>
      </Suspense>
      <Suspense>
        <FAQ></FAQ>
      </Suspense>
    </div>
  );
};

export default Home;
