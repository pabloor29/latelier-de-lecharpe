'use client'

import React, { useState, useEffect } from "react";
import FormuleCard from "@/components/FormuleCard";
import { createBrowserClient } from '@supabase/ssr';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Formule = {
  id: number;
  nom: string;
  prix: number;
  description: string | null;
  elements: string[];
  active: boolean;
};

export default function GroupSection() {
  const [formules, setFormules] = useState<Formule[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFormules = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("formules")
      .select("*")
      .order("prix", { ascending: true });

    if (error) {
      console.error(error);
      setFormules([]);
    } else if (data) {
      setFormules(data.filter((f: any) => f.active));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFormules();
  }, []);

  if (loading) return <p className="text-center py-10 text-mustard font-specialElite">Chargement...</p>;

  return (
    <div className="w-screen bg-blueLight flex flex-col justify-center items-center py-20">
      <h2 className="w-11/12 text-center leading-none text-3xl text-mustard font-specialElite tracking-wide">
        Nos formules de groupe
      </h2>

      <p className="font-specialElite text-center mt-8 w-3/5 text-mustard">
        Les formules sont obligatoires à partir de 14 personnes. La totalité des convives doivent sélectionner la même formule.
      </p>

      <div className="lg:w-3/5 w-4/5 flex flex-col justify-between items-center py-12 space-y-4">
        {formules.map(f => (
          <FormuleCard
            key={f.id}
            nom={f.nom}
            prix={f.prix}
            description={f.description}
            elements={f.elements || []}
          />
        ))}
      </div>
    </div>
  );
}
