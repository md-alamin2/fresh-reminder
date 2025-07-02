import React from "react";
import Stats from "../../Components/Stats/Stats";
import Mission from "../../Components/Mission/Mission";
import {motion} from "framer-motion"

const About = () => {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1}} className="w-11/12 lg:container mx-auto mt-20">
      <title>FreshReminder-About</title>
      <h2 className="text-4xl md:text-5xl font-bold text-center max-w-xl mx-auto">
        Reducing Food Waste, One Meal at a Time
      </h2>
      <p className="text-lg md:text-xl font-thin text-center mt-5 max-w-xl mx-auto">
        We're on a mission to help families and communities reduce food waste
        through smart tracking, timely alerts, and actionable insights.
      </p>

      <div>
        <Stats></Stats>
        <Mission></Mission>
      </div>
    </motion.div>
  );
};

export default About;
