import ContactForm from "@/components/ContactForm";
import CustomHeroBanner from "@/components/CustomHeroBanner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

function ReservationPage() {
  return (
    <>
      <Navbar />
      <CustomHeroBanner title="Reservation" img="/IMG_0221.webp" />
      <ContactForm />
      <Footer />
    </>
  );
}

export default ReservationPage;
