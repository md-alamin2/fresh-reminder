import React, { use } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router";
import { motion } from "framer-motion";
import DecryptedText from "../../../Reactbits/DecryptedText/DecryptedText";
import FadeContent from "../../../Reactbits/FadeContent/FadeContent"

const sliderPromise = fetch("/slider.json").then((res) => res.json());

const Slider = () => {
  const slides = use(sliderPromise);

  return (
    <div className="w-full rounded-lg overflow-hidden shadow-lg relative z-0">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="hero min-h-[calc(100vh-90px)]"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              <div className="hero-overlay"></div>
              <div className="hero-content text-center text-neutral-content">
                <FadeContent
                  blur={true}
                  duration={500}
                  easing="ease-in"
                  initialOpacity={0}
                >
                  <div className="max-w-2xl">
                  <h1 className="text-3xl md:text-7xl font-bold mb-4">
                    {slide.heading}
                  </h1>
                  <p className="text-lg md:text-2xl font-semibold text-[#64b843]">
                    {slide.subheading}
                  </p>
                  <p className="text-sm md:text-xl mt-4">{slide.description}</p>
                  <Link
                    to="/add-food"
                    className="btn bg-[#64b843] border-none mt-5"
                  >
                    Get Started
                  </Link>
                </div>
                </FadeContent>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
