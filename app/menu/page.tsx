import CustomHeroBanner from "@/components/CustomHeroBanner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

function MenuPage() {
  return (
    <>
      <Navbar />
      <CustomHeroBanner title="menu" img="/IMG_0236.webp" />

      <div className="w-full flex justify-center items-center bg-[url('/carteETE2023-1.webp')]">
        <div className="lg:w-3/5 w-11/12 flex flex-col items-center justify-center py-20 space-y-6">
          <img
            className="w-full h-auto object-cover"
            src="/carteETE2025-1.webp"
            alt=""
          />
          <img
            className="w-full h-auto object-cover"
            src="/carteETE2025-2.webp"
            alt=""
          />
          <img
            className="w-full h-auto object-cover"
            src="/carteETE2025-3.webp"
            alt=""
          />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default MenuPage;
