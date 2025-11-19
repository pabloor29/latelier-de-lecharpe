"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type FormuleCardProps = {
  emoji: string;
  title: string;
  description: string;
};

export default function FormuleCard({ emoji, title, description }: FormuleCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
        {isOpen ? (
            <div
                className="flex items-center justify-between px-8 py-2 bg-mustard/70 rounded-t-2xl cursor-pointer md:w-full"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-3">
                <span className="text-2xl">{emoji}</span>
                <h3 className="text-xl font-specialElite text-redWine whitespace-nowrap">{title}</h3>
                </div>
                <ChevronUp className="w-6 h-6 ml-5 text-clearColor" />
            </div>
        ) : (
            <div
                className="flex items-center justify-between px-8 pt-2 bg-mustard rounded-t-2xl cursor-pointer md:w-full"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-3">
                <span className="text-2xl">{emoji}</span>
                <h3 className="text-xl font-specialElite text-redWine whitespace-nowrap">{title}</h3>
                </div>
                <ChevronDown className="w-6 h-6 ml-5 text-clearColor" />
            </div>
        )}

      {/* Panneau dépliant */}
      {isOpen && (
        <div className="w-full px-8 py-4 bg-mustard/70 rounded-b-xl">
          <p className="text-blueDark font-specialElite">{description}</p>
        </div>
      )}
    </div>
  );
}
