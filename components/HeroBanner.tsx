"use client";

import { Variants, motion } from "framer-motion";
import React from "react";

const textVariants: Variants = {
  hidden: {
    y: 100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 1,
    },
  },
};

function HeroBanner() {
  return (
    <div className="h-screen w-full flex justify-center items-center bg-gradient-to-b from-[#001F50] to-[#002E6D]">
      <div className="h-screen w-full flex justify-center items-center bg-black/60 absolute z-10"></div>
      <img
        src="/bar-black.webp"
        alt=""
        className="w-full h-screen object-cover absolute z-0"
      />
      <div className="relative z-20 flex flex-col items-center justify-center leading-none">
        <motion.h1
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariants}
          className="text-bigSM lg:text-bigLG text-white font-spaceTransit
            tracking-wide z-30 drop-shadow-[5px_5px_0_#00A6E6]"
        >
          FLORIDABLANCA
        </motion.h1>
        <motion.h3
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariants}
          className="z-10 text-white/90 font-spaceTransit lg:text-5xl text-2xl"
        >
          Bar a poulpe. Tapas espagnols maison avec vins regionaux.
        </motion.h3>
      </div>
    </div>
  );
}

export default HeroBanner;
