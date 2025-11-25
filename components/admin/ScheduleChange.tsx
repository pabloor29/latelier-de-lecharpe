"use client";

import { saveOpeningHours } from "@/lib/supabaseClient";
import React, { useEffect, useState } from "react";
import { createBrowserClient } from '@supabase/ssr';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

type TimeSlot = {
  midi: { debut: string; fin: string };
  soir: { debut: string; fin: string };
};

const defaultTimes: TimeSlot[] = days.map(() => ({
  midi: { debut: "", fin: "" },
  soir: { debut: "", fin: "" },
}));

const defaultClosed = days.map(() => ({
  closedLunch: false,
  closedDiner: false,
  closedDay: false,
}));

function ScheduleChange() {
  const [times, setTimes] = useState<TimeSlot[]>(defaultTimes);
  const [closed, setClosed] = useState(defaultClosed);

  useEffect(() => {
    async function fetchOpeningHours() {
      const { data, error } = await supabase
        .from("opening_hours")
        .select("hours")
        .eq("id", 1)
        .single();

      if (!error && data?.hours) {
        const loadedTimes: TimeSlot[] = data.hours.map((h: any) => ({
          midi: h.midi || { debut: "", fin: "" },
          soir: h.soir || { debut: "", fin: "" },
        }));
        const loadedClosed = data.hours.map((h: any) => ({
          closedLunch: h.closedLunch || false,
          closedDiner: h.closedDiner || false,
          closedDay: h.closedDay || false,
        }));

        setTimes(loadedTimes);
        setClosed(loadedClosed);
      }
    }

    fetchOpeningHours();
  }, []);

  const handleChange = (
    dayIndex: number,
    period: "midi" | "soir",
    field: "debut" | "fin",
    value: string
  ) => {
    const updated = [...times];
    updated[dayIndex][period][field] = value;
    setTimes(updated);
  };

  const handleClosedChange = (
    dayIndex: number,
    field: "closedLunch" | "closedDiner" | "closedDay"
  ) => {
    const updated = [...closed];
    updated[dayIndex][field] = !updated[dayIndex][field];
    setClosed(updated);
  };

  const renderTable = (
    title: string,
    fields: { label: string; key: keyof TimeSlot | keyof typeof closed[0] }[],
    period?: "midi" | "soir"
  ) => (
    <div className="overflow-x-auto mb-4">
      <h2 className="font-semibold mb-2">{title}</h2>
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr>
            <th className="border border-gray-300 px-2">Jour</th>
            {fields.map((f) => (
              <th key={f.label} className="border border-gray-300 px-2">{f.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map((day, i) => (
            <tr key={day}>
              <td className="border border-gray-300 px-2">{day}</td>
              {fields.map((f) => {
                if (period && f.key in times[i]) {
                  const fieldKey = f.key as keyof TimeSlot;
                  const value = times[i][fieldKey][f.label === "début" ? "debut" : "fin"];
                  return (
                    <td key={f.label} className="border border-gray-300 px-2">
                      <input
                        type="time"
                        value={value}
                        onChange={(e) => handleChange(i, period, f.label === "début" ? "debut" : "fin", e.target.value)}
                        className="w-full bg-cream"
                      />
                    </td>
                  );
                } else {
                  const fieldKey = f.key as keyof typeof closed[0];
                  return (
                    <td key={f.label} className="border border-gray-300 px-2 text-center">
                      <input
                        type="checkbox"
                        checked={closed[i][fieldKey]}
                        onChange={() => handleClosedChange(i, fieldKey)}
                        className="w-full bg-cream"
                      />
                    </td>
                  );
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div>
      <h1 className="font-specialElite pb-2">Horaires d'ouverture</h1>

      {/* Desktop: tableau complet */}
      <div className="hidden md:block">
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr>
              <th className="border border-gray-300 px-2"> </th>
              <th colSpan={2} className="border border-gray-300 px-2">midi</th>
              <th colSpan={2} className="border border-gray-300 px-2">soir</th>
              <th colSpan={3} className="border border-gray-300 px-2">jours de fermeture</th>
            </tr>
            <tr>
              <th className="border border-gray-300 px-2"> </th>
              <th className="border border-gray-300 px-2">début</th>
              <th className="border border-gray-300 px-2">fin</th>
              <th className="border border-gray-300 px-2">début</th>
              <th className="border border-gray-300 px-2">fin</th>
              <th className="border border-gray-300 px-2">fermé midi</th>
              <th className="border border-gray-300 px-2">fermé soir</th>
              <th className="border border-gray-300 px-2">fermé jour</th>
            </tr>
          </thead>
          <tbody>
            {days.map((day, i) => (
              <tr key={day}>
                <td className="border border-gray-300 px-2">{day}</td>
                <td className="border border-gray-300 px-2">
                  <input
                    type="time"
                    value={times[i].midi.debut}
                    onChange={(e) => handleChange(i, "midi", "debut", e.target.value)}
                    className="w-full bg-cream"
                  />
                </td>
                <td className="border border-gray-300 px-2">
                  <input
                    type="time"
                    value={times[i].midi.fin}
                    onChange={(e) => handleChange(i, "midi", "fin", e.target.value)}
                    className="w-full bg-cream"
                  />
                </td>
                <td className="border border-gray-300 px-2">
                  <input
                    type="time"
                    value={times[i].soir.debut}
                    onChange={(e) => handleChange(i, "soir", "debut", e.target.value)}
                    className="w-full bg-cream"
                  />
                </td>
                <td className="border border-gray-300 px-2">
                  <input
                    type="time"
                    value={times[i].soir.fin}
                    onChange={(e) => handleChange(i, "soir", "fin", e.target.value)}
                    className="w-full bg-cream"
                  />
                </td>
                <td className="border border-gray-300 px-2">
                  <input
                    type="checkbox"
                    checked={closed[i].closedLunch}
                    onChange={() => handleClosedChange(i, "closedLunch")}
                    className="w-full bg-cream"
                  />
                </td>
                <td className="border border-gray-300 px-2">
                  <input
                    type="checkbox"
                    checked={closed[i].closedDiner}
                    onChange={() => handleClosedChange(i, "closedDiner")}
                    className="w-full bg-cream"
                  />
                </td>
                <td className="border border-gray-300 px-2">
                  <input
                    type="checkbox"
                    checked={closed[i].closedDay}
                    onChange={() => handleClosedChange(i, "closedDay")}
                    className="w-full bg-cream"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: 3 tableaux séparés */}
      <div className="md:hidden">
        {renderTable("Horaires du midi", [
          { label: "début", key: "midi" },
          { label: "fin", key: "midi" },
        ], "midi")}

        {renderTable("Horaires du soir", [
          { label: "début", key: "soir" },
          { label: "fin", key: "soir" },
        ], "soir")}

        {renderTable("Jours de fermeture", [
          { label: "fermé midi", key: "closedLunch" },
          { label: "fermé soir", key: "closedDiner" },
          { label: "fermé jour", key: "closedDay" },
        ])}
      </div>

      <button
        onClick={() => {
          const payload = days.map((d, i) => ({
            day: d,
            midi: times[i].midi,
            soir: times[i].soir,
            ...closed[i],
          }));

          saveOpeningHours(1, payload)
            .then(() => alert("Horaires enregistrés !"))
            .catch(() => alert("Erreur lors de l'enregistrement"));
        }}
        className="bg-black text-white px-4 py-2 rounded-md mt-4"
      >
        Enregistrer les nouveaux horaires
      </button>
    </div>
  );
}

export default ScheduleChange;
