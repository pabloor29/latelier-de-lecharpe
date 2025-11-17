import React from "react";
import Carousel from "./Carousel";

const images = [
  "IMG_0209",
  "IMG_0214",
  "IMG_0216",
  "IMG_0218",
  "IMG_0220",
  "IMG_0221",
  "IMG_0223",
  "IMG_0227",
  "IMG_0230",
  "IMG_0234",
];

function CarouselRestaurant() {
  return <Carousel images={images} />;
}

export default CarouselRestaurant;
