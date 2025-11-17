"use client";
import { Variants, motion } from "framer-motion";
import Link from "next/link";
import React from "react";

const imagesVariants: Variants = {
  hiddenFade: {
    opacity: 0,
  },
  visibleFade: {
    opacity: 0.3,
    transition: {
      type: "spring",
      duration: 3,
    },
  },
  hiddenBottom: {
    y: 100,
    opacity: 0,
  },
  visibleBottom: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 0.8,
    },
  },
  hiddenLeft: {
    x: 200,
    opacity: 0,
  },
  visibleLeft: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 0.8,
    },
  },
  hiddenRight: {
    opacity: 0,
    x: -200,
  },
  visibleRight: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      duration: 1.5,
    },
  },
};

function IntroVins() {
  return (
    <div className="relative w-full bg-[#002E6D] flex flex-col lg:flex-row justify-center items-center py-10 mb-20">
      <motion.div
        initial="hiddenRight"
        whileInView="visibleRight"
        viewport={{ once: true, margin: "-20%" }}
        variants={imagesVariants}
        className="lg:w-2/5 relative flex justify-center items-center"
      >
        <img
          src="/wine_poulpe.webp"
          alt=""
          className="lg:absolute lg:w-7/12 w-2/3 rotate-[30deg] z-30 drop-shadow-[-15px_15px_3px_rgba(0,0,0,0.25)]"
        />
      </motion.div>

      <motion.div
        initial="hiddenLeft"
        whileInView="visibleLeft"
        viewport={{ once: true, margin: "-20%" }}
        variants={imagesVariants}
        className="lg:w-3/5 w-5/6 flex flex-col space-y-8 z-20"
      >
        <h3 className="text-white font-spaceTransit text-6xl tracking-wide">
          Notre selection de vins
        </h3>
        <article className="lg:w-4/5 text-white text-justify lg:text-left">
          Plongez dans l'essence même de notre terroir avec "L'Encre du Poulpe",
          un vin rouge produit par un vigneron local, cher ami de notre chef. Ce
          dernier représente l'authenticité et la passion du savoir-faire
          régional. Arborant une étiquette unique, créée spécialement pour le
          restaurant du Floridablanca par un ami du chef, ce vin incarne
          parfaitement l'âme et l'identité de notre établissement. Découvrez une
          expérience gustative qui célèbre l'amitié, la tradition et l'amour du
          vin.
        </article>

        <Link
          href="/menu"
          className="bg-white hover:bg-[#002E6D] border hover:border-white text-[#002E6D] hover:text-white lg:w-fit w-full text-center text-xl lg:text-base duration-200 px-5 lg:py-2 py-4 font-medium"
        >
          Nos Vins
        </Link>
      </motion.div>

      <motion.img
        initial="hiddenFade"
        whileInView="visibleFade"
        viewport={{ once: true, margin: "-20%" }}
        variants={imagesVariants}
        src="/octopus-tentacule-1.webp"
        alt=""
        className="absolute lg:w-1/3 top-56 right-[15vw] lg:top-20 rotate-[200deg] lg:rotate-0 scale-150 lg:scale-100 lg:right-0 z-0 opacity-30"
      />
    </div>
  );
}

export default IntroVins;
