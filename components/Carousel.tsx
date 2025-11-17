"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Carousel: React.FC<{ images: string[] }> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative">
      <button
        className="absolute h-full lg:w-28 left-0 top-0 transform bg-gray-800/70 p-2 grid place-items-center text-white z-20"
        onClick={goToPrevSlide}
      >
        <ChevronLeft className="scale-150" />
      </button>

      <button
        className="absolute h-full lg:w-28 right-0 top-0 transform bg-gray-800/70 p-2 grid place-items-center text-white z-20"
        onClick={goToNextSlide}
      >
        <ChevronRight className="scale-150" />
      </button>

      <div className="relative w-full h-[620px] z-10">
        <Image
          src={`/${images[currentIndex]}.webp`}
          alt={`Slide ${currentIndex}`}
          fill
          objectFit="cover"
        />
      </div>

      <div
        className="
      absolute
      -bottom-1
      left-0
      w-full
      overflow-hidden
      leading-none
      rotate-180
      bg-transparent
      z-30
      "
      >
        <svg
          className="
            relative
            block
            h-14
            rotate-180
            w-full
            "
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="fill-[#002E6D]"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Carousel;
