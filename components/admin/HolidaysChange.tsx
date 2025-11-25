"use client";

import React, { useEffect, useState } from "react";
import { saveHolidays } from "@/lib/supabaseClient";
import { createBrowserClient } from '@supabase/ssr';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

function HolidaysChange() {
  const [periods, setPeriods] = useState([{ debut: "", fin: "" }]);
  const restaurantId = 1; // Si un seul restaurant, laisse comme ça

  // 🔵 Charger les vacances existantes au chargement
  useEffect(() => {
    async function fetchHolidays() {
      const { data, error } = await supabase
        .from("holidays")
        .select("periods")
        .eq("restaurant_id", restaurantId)
        .single();

      if (!error && data?.periods) {
        setPeriods(data.periods);
      }
    }

    fetchHolidays();
  }, []);

  const addPeriod = () => {
    setPeriods([...periods, { debut: "", fin: "" }]);
  };

  const removePeriod = (index: number) => {
    const updated = periods.filter((_, i) => i !== index);
    setPeriods(updated);
  };

  const updatePeriod = (index: number, field: "debut" | "fin", value: string) => {
    const updated = [...periods];
    updated[index][field] = value;
    setPeriods(updated);
  };

  const save = () => {
    saveHolidays(restaurantId, periods)
      .then(() => alert("Périodes de vacances enregistrées !"))
      .catch(() => alert("Erreur lors de l'enregistrement"));
  };

  return (
    <div>
      <h1 className="font-specialElite text-xl mb-4">Périodes de vacances</h1>

      <div className="space-y-4">
        {periods.map((p, i) => (
          <div
            key={i}
            className="p-4 border border-gray-300 rounded-md bg-cream flex flex-col md:flex-row items-center gap-4"
          >
            <div className="flex flex-col">
              <label>Début</label>
              <input
                type="date"
                value={p.debut}
                onChange={(e) => updatePeriod(i, "debut", e.target.value)}
                className="bg-white border px-2 py-1 rounded"
              />
            </div>

            <div className="flex flex-col">
              <label>Fin</label>
              <input
                type="date"
                value={p.fin}
                onChange={(e) => updatePeriod(i, "fin", e.target.value)}
                className="bg-white border px-2 py-1 rounded"
              />
            </div>

            <button
              onClick={() => removePeriod(i)}
              className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
            >
              Supprimer
            </button>
          </div>
        ))}

        <div className="flex gap-4">
          <button
            onClick={addPeriod}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Ajouter une période
          </button>

          <button
            onClick={save}
            className="bg-black text-white px-4 py-2 rounded-md"
          >
            Enregistrer les congés
          </button>
        </div>
      </div>
    </div>
  );
}

export default HolidaysChange;
