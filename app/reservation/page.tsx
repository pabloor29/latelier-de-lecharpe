import ContactForm from "@/components/ContactForm";
import CustomHeroBanner from "@/components/CustomHeroBanner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

function ReservationPage() {
  return (
    <>
      <Navbar />
      <CustomHeroBanner title="resrevation" colorText="#FBE9D5" colorBG="#A40001" />
      <ContactForm />
      <Footer />
    </>
  );
}

export default ReservationPage;
