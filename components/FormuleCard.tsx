"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type FormuleCardProps = {
  nom: string;
  prix: number;
  description: string | null;
  elements: string[];
  emoji?: string; // optionnel si tu veux garder l’emoji
};

export default function FormuleCard({
  nom,
  prix,
  description,
  elements,
  emoji = "🍽️",
}: FormuleCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      {/* HEADER */}
      <div
        className={`flex items-center justify-between px-8 py-2 cursor-pointer md:w-full
          ${isOpen ? "bg-mustard/70 rounded-t-2xl" : "bg-mustard rounded-t-2xl pt-2"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{emoji}</span>

          {/* NOM + PRIX */}
          <h3 className="text-xl font-specialElite text-redWine whitespace-nowrap">
            {nom} — {prix}€
          </h3>
        </div>

        {isOpen ? (
          <ChevronUp className="w-6 h-6 ml-5 text-clearColor" />
        ) : (
          <ChevronDown className="w-6 h-6 ml-5 text-clearColor" />
        )}
      </div>

      {/* CONTENU DÉPLIANT */}
      {isOpen && (
        <div className="w-full px-8 py-4 bg-mustard/70 rounded-b-xl">
          {/* Description */}
          {description && (
            <p className="text-blueDark font-specialElite text-xl mb-3">{description}</p>
          )}

          {/* Liste des éléments */}
          {elements.length > 0 && (
            <ul className="list-disc ml-6 text-blueDark font-specialElite font-medium">
              {elements.map((el, idx) => (
                <li key={idx} className="py-0.5">
                  {el}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
