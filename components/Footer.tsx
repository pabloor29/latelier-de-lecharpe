import { Instagram, Mail, Phone } from "lucide-react";
import React from "react";

function Footer() {
  return (
    <footer className="w-full bg-[#f0f5ff] flex flex-col justify-center items-center">
      <div className="flex flex-col lg:flex-row w-5/6 lg:justify-between justify-center items-center p-4 space-y-12 lg:space-y-0">
        <div className="lg:w-1/3 w-full text-[#0A3C74] flex flex-col items-center justify-center">
          <h4 className="font-spaceTransit text-5xl mb-3">HORAIRES</h4>
          <ul className="flex items-center justify-between space-x-10">
            <div className="flex flex-col items-center justify-center text-center">
              <li className="font-bold text-lg">Juillet - Août</li>
              <p>Lundi</p>
              <p>
                18:00 - 22:00
              </p>
              <p className="mt-2">Mardi - Samedi</p>
              <p>
                12:00 - 14:00 <br /> 18:00 - 22:00
              </p>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <li className="font-bold text-lg">Septembre - Octobre</li>
              <li className="font-bold text-lg">Mars - Juin</li>
              <p>Mardi - Samedi</p>
              <p>
                12:00 - 14:00 <br /> 18:00 - 22:00
              </p>
            </div>
          </ul>
        </div>

        <div className="lg:w-1/3 w-full text-[#0A3C74] flex flex-col items-center justify-center">
          <h4 className="font-spaceTransit text-5xl mb-3">ADRESSE</h4>
          <a
            className="flex flex-col items-center justify-center text-center hover:underline"
            href="https://www.google.fr/maps/place/8+Rue+de+l'%C3%89charpe,+31000+Toulouse/@43.6020582,1.4432728,676m/data=!3m2!1e3!4b1!4m6!3m5!1s0x12aebc9daaafffff:0x6b0c27a5efb0ecff!8m2!3d43.6020582!4d1.4458477!16s%2Fg%2F11l_4l0gq7?entry=ttu&g_ep=EgoyMDI1MTExNi4wIKXMDSoASAFQAw%3D%3D"
          >
            8 rue de l'Écharpe
            <br />
            31000, Toulouse
          </a>
        </div>

        <div className="lg:w-1/3 w-full text-[#0A3C74] flex flex-col items-center justify-center">
          <h4 className="font-spaceTransit text-5xl mb-3">CONTACT</h4>
          <ul className="flex flex-col items-center justify-center">
            <li className="flex gap-2 mb-3 hover:underline">
              <Mail />
              <a href="mailto:atelier1524@orange.com">
                atelier1524@orange.com
              </a>
            </li>
            <li className="flex gap-2 mb-3 hover:underline">
              <Phone />
              <a href="tel:+33534309335">+33 5 34 30 93 35</a>
            </li>
            <li className="flex gap-2 mb-3 hover:underline">
              <Instagram />
              <a href="https://www.instagram.com/latelierdelecharpe_/">@latelierdelecharpe_</a>
            </li>
            <li className="flex gap-2 mb-3 hover:underline"></li>
          </ul>
        </div>

        <div className="w-40 flex items-center justify-center">
          <img src="#" alt="Logo" />
        </div>
      </div>

      <a
        href="https://portfolio-pablo-teal.vercel.app/"
        className="text-[#0A3C74] hover:underline py-2 text-xs w-full bg-[#e0ebff] flex justify-center items-center"
      >
        © This is a PABLO ORTEGA creation - 2025
      </a>
    </footer>
  );
}

export default Footer;
