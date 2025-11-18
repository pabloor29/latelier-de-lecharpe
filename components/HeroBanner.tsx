"use client";

import { Variants, motion } from "framer-motion";
import React from "react";

const textVariantsLeft: Variants = {
  hidden: {
    x: -200,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 1,
    },
  },
};

const textVariantsTop: Variants = {
  hidden: {
    y: -300,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 2,
    },
  },
};

const textVariantsRight: Variants = {
  hidden: {
    x: 500,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 3,
    },
  },
};

function HeroBanner() {
  return (
    <div className="h-screen w-full flex justify-center items-center bg-cream">
      <div className="relative z-20 flex flex-col leading-none">
        <motion.h1
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariantsLeft}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-black tracking-wider"
        >
          L'ATELIER
        </motion.h1>
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariantsTop}
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-black tracking-wide"
        >
          <div className="absolute -rotate-90 translate-x-[142px] -translate-y-[40px] sm:translate-x-[178px] sm:-translate-y-[50px] md:translate-x-[212px] md:-translate-y-[60px] lg:translate-x-[284px] lg:-translate-y-[80px]">
            DE
          </div>
        </motion.h2>
        <motion.h3
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariantsRight}
          className="text-black text-xl sm:text-2xl md:text-3xl lg:text-4xl text-end"
        >
          L'ÉCHARPE
        </motion.h3>
      </div>
    </div>
  );
}

export default HeroBanner;
