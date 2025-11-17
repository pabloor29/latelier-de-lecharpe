import Bubble from "@/components/Bubble";
import CustomHeroBanner from "@/components/CustomHeroBanner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

function AboutPage() {
  return (
    <>
      <Navbar />
      <CustomHeroBanner title="Presentation" img="/IMG_0230.webp" />

      <div className="z-40 flex justify-center items-center pt-12 pb-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="lg:w-3/5 w-5/6 flex flex-col lg:flex-row justify-center items-center lg:space-x-20 space-y-16">
          <img
            src="/worker.webp"
            alt=""
            className="shadow-[-25px_25px_0_0_#002E6D] lg:w-1/2 w-5/6"
          />
          <div className="lg:w-1/2 flex flex-col lg:space-y-8">
            <h3 className="text-[#002E6D] text-7xl font-medium font-spaceTransit">
              le chef JEAN-LOUP
            </h3>
            <article className="text-[#274b7e] text-justify lg:text-left">
              Le Floridablanca a ouvert ses portes en 2017, rue trivalle, à
              mi-chemin entre la Bastide et la Cité Médiévale. Jean-Loup,
              affable, régale sa clientèle, qui mêle tout autant de touristes
              que de "figures" carcassonnaises, de préparations culinaires
              largement inspirées de sa culture méditerranéenne. À la carte, on retrouve plats et tapas : de
              l'encornet et aïoli maison aux padrons en passant par une
              pika-pika de boeuf ou quelques calçots...
            </article>
          </div>
        </div>
      </div>

      <div className="relative bg-gradient-to-t from-[#000e21] to-[#295DA6] flex justify-center items-center py-20 text-white">
        <div
        className="
    absolute
    top-0
    left-0
    w-full
    overflow-hidden
    leading-none
    rotate-180
    bg-white
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
            className="fill-[#285AA2]"
          ></path>
        </svg>
      </div>
        <Bubble />
        <div className="lg:w-3/5 w-5/6 flex flex-col justify-center items-center space-y-20">
          <h3 className="text-7xl font-spaceTransit w-full text-center">
            Trois salles, trois ambiances...
          </h3>
          <div className="flex flex-col space-y-32">
            <div className="flex flex-col lg:flex-row justify-center items-center lg:space-x-16 space-y-8">
              <div className="lg:w-1/3 flex flex-col space-y-4 lg:text-right text-center">
                <h3 className="leaning-none text-5xl font-medium font-spaceTransit">
                  La terrasse
                </h3>
                <article className="text-justify lg:text-right">
                  Profitez de nos tapas avec une vue sur la majestueuse cité
                  médiévale de Carcassonne. Notre terrasse vous offre
                  l'opportunité de savourer nos délicieuses spécialités
                  espagnoles dans un cadre chaleureux en plein air.
                </article>
              </div>
              <div className="lg:w-2/3">
                <img
                  src="/moules.webp"
                  alt=""
                  className="rotate-3 shadow-md hover:scale-105 duration-300"
                />
              </div>
            </div>

            <div className="flex flex-col-reverse lg:flex-row justify-center items-center lg:space-x-16 space-y-8">
              <div className="lg:w-2/3">
                <img
                  src="/IMG_0225.webp"
                  alt=""
                  className="-rotate-3 shadow-md scale-75 hover:scale-90 duration-300"
                />
              </div>
              <div className="lg:w-1/3 flex flex-col space-y-8 text-center lg:text-left">
                <h3 className="text-5xl font-medium font-spaceTransit">
                  La salle du bar-restaurant
                </h3>
                <article className="text-justify lg:text-left">
                  Plongez dans l'ambiance chaleureuse de notre salle principale,
                  où se mêlent l'élégance rustique et le charme espagnol. Les
                  décorations authentiques créent une atmosphère accueillante
                  pour déguster nos plats exquis et savourer un large choix de
                  boissons. Cette salle s'étend tout le long de la cuisine
                  ouverte, offrant ainsi à nos convives une expérience immersive
                  où ils peuvent voir notre talentueux chef préparer chaque plat
                  avec passion et expertise.
                </article>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-center items-center lg:space-x-16 space-y-8">
              <div className="lg:w-1/3 flex flex-col space-y-8 lg:text-right text-center">
                <h3 className="text-5xl font-medium font-spaceTransit">
                  Le patio
                </h3>
                <article className="text-justify lg:text-right">
                  Notre patio est l'endroit idéal pour organiser des événements
                  spéciaux dans un cadre intime. Entouré de décorations plus
                  originales les unes que les autres, il offre une atmosphère
                  paisible et relaxante, parfaitement adaptée à des occasions
                  mémorables. De plus, l'ambiance conviviale de soirées d'été ou
                  de tout type ajoute une touche festive à cet espace
                  couvert. Réservez le patio pour célébrer vos moments
                  précieux avec style, authenticité et une petite touche
                  espagnole.
                </article>
              </div>
              <div className="lg:w-2/3">
                <img
                  src="/patio_new.webp"
                  alt=""
                  className="rotate-3 shadow-md scale-75 hover:scale-90 duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default AboutPage;
