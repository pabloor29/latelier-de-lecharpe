'use client'

import { supabase } from "@/lib/supabseClient";
import { useEffect, useState } from "react";
import CustomHeroBanner from "@/components/CustomHeroBanner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Banknote, CreditCard, Coins, Ticket } from "lucide-react";
import React from "react";

function ContactPage() {

  const [hours, setHours] = useState<any[] | null>(null);
  
  useEffect(() => {
    async function fetchHours() {
      const { data, error } = await supabase
        .from("opening_hours")
        .select("hours")
        .eq("id", 1)
        .single();
  
      if (!error && data?.hours) {
        setHours(data.hours);
      }
    }
  
    fetchHours();
  }, []);

  return (
    <>
      <Navbar />
      <CustomHeroBanner title="Contact" img="/IMG_0234.webp" />

      <div className="w-full flex flex-col lg:flex-row justify-between lg:space-x-8 space-y-8 lg:space-y-0">
        <div className="lg:h-[750px] h-[1100px] lg:w-1/2 lg:pl-16 space-y-8 flex flex-col items-center justify-center lg:py-12">
          <h3 className="z-10 leading-none text-[#002E6D] text-4xl tracking-wide">
            L'aterlier de l'écharpe
          </h3>

          <div className="flex flex-col lg:flex-row items-center justify-between lg:space-x-16">
            <div className="flex flex-col justify-between items-center space-y-12">
              <div className="text-[#002E6D] flex flex-col space-y-3 items-center lg:items-start justify-center">
                <h4 className="underline">
                  8 rue de l'Écharpe, 31000 Toulouse
                </h4>
                <a href="tel:+33534309335">TEL : +33 5 34 30 93 35</a>
                {/* <a href="">Mobile : +33 6 34 29 48 74</a> */}
              </div>

              <div className="text-[#002E6D] w-full flex flex-col space-y-3 items-center lg:items-start justify-center">
                <p>Modes de paiment</p>
                <div className="flex items-center space-x-10">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="scale-125">
                          <CreditCard />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Carte de crédit</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="scale-125">
                          <Banknote />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Chèques vacances</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="scale-125">
                          <Coins />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Espèces</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              <div className="text-[#002E6D] flex w-full flex-col justify-center items-center lg:items-start space-y-3">
                <p>Animaux acceptés</p>
                <p>Accès Internet Wifi</p>
                <p>🇬🇧 Anglais</p>
                <p>🇪🇸 Espagnol</p>
              </div>
            </div>

            <div className="w-full text-redWine flex flex-col items-center justify-center">
              <h4 className="font-specialElite text-4xl mb-3">HORAIRES</h4>

              {!hours ? (
                <p>Chargement...</p>
              ) : (
                <ul className="flex flex-col items-center justify-center space-y-2 text-center">
                  {hours.map((h: any) => {
                    const closedAllDay = h.closedDay;
                    const closedLunch = h.closedLunch;
                    const closedDiner = h.closedDiner;

                    return (
                      <li key={h.day} className="font-semibold">
                        <strong>{h.day} :</strong>{" "}
                        {closedAllDay ? (
                          <span>fermé</span>
                        ) : (
                          <span>
                            {/* Midi */}
                            {closedLunch
                              ? "fermé le midi"
                              : `${h.midi.debut || "—"} - ${h.midi.fin || "—"}`}

                            {" | "}

                            {/* Soir */}
                            {closedDiner
                              ? "fermé le soir"
                              : `${h.soir.debut || "—"} - ${h.soir.fin || "—"}`}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 flex items-center justify-center lg:h-[750px] h-[500px] overflow-hidden">
          <iframe
              title="Google Map"
              width="100%"
              height="100%"
              style={{ 
                border: 10,
                padding: 40,
                borderRadius: 50
               }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2941.883308141408!2d1.4432727762339608!3d43.60205817110451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12aebc9daaafffff%3A0x6b0c27a5efb0ecff!2s8%20Rue%20de%20l&#39;%C3%89charpe%2C%2031000%20Toulouse!5e1!3m2!1sfr!2sfr!4v1763412495463!5m2!1sfr!2sfr"
              className="rounded-3xl"
          >
          </iframe>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ContactPage;
