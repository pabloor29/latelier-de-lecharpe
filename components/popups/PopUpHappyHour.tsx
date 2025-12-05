"use client";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function PopUpHappyHour() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Affichage automatique après 1 seconde
    const timer = setTimeout(() => {
      setOpen(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-redWine p-6 rounded-xl shadow-xl animate-fadeIn w-4/5 md:w-1/2 lg:w-1/3">
        <div className="">
          <button
            onClick={() => setOpen(false)}
            className="float-right text-gray-400 hover:text-gray-600"
          >
            <X />
          </button>

          <h2 className="text-xl font-specialElite text-cream mb-2">Happy hour à l'Atelier de l'Écharpe !</h2>
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <div className="text-center font-specialElite text-cream my-2">
            <h3>Du mardi au samedi</h3>
            <h3>De 17h à 19h</h3>
          </div>
          <div className="font-specialElite text-cream mt-4 w-full sm:w-2/3">
            <div className="flex justify-between">
              <p>🍺 Pinte de blonde MUNICH </p>
              <p>4€</p>
            </div>
            <div className="flex justify-between">
              <p>🍺 Pinte des autres bières</p>
              <p>5€</p>
            </div>
            <div className="flex justify-between">
              <p>🥃 Ricard</p>
              <p>2€</p>
            </div>
            <div className="flex justify-between">
              <p>🍹 Spritz ou Mojito</p>
              <p>5€</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
