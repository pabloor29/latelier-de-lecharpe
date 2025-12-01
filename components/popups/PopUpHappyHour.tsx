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
      <div className="bg-redWine p-6 rounded-xl shadow-xl animate-fadeIn w-4/5 md:w-1/3">
        <button
          onClick={() => setOpen(false)}
          className="float-right text-gray-400 hover:text-gray-600"
        >
          <X />
        </button>

        <h2 className="text-xl font-specialElite text-cream mb-2">Happy hour à l'Aterlier de l'Écharpe</h2>
        <p className="text-gray-700 text-sm">
          Ceci est un popup automatique dans Next.js.
        </p>
      </div>
    </div>
  );
}
