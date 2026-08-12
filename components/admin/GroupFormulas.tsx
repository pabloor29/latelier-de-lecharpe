"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from '@supabase/ssr';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { db: { schema: 'latelier_de_lecharpe' } }
  )

type Formule = {
  id: string;
  nom: string;
  prix: number;
  description: string | null;
  elements: string[];
  active: boolean;
  created_at: string;
};

export default function GroupFormulas() {
  const [formules, setFormules] = useState<Formule[]>([]);
  const [loading, setLoading] = useState(true);

  // Champs du formulaire
  const [nom, setNom] = useState("");
  const [prix, setPrix] = useState("");
  const [description, setDescription] = useState("");
  const [elements, setElements] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);

  // Charger les formules
  useEffect(() => {
    loadFormules();
  }, []);

  const loadFormules = async () => {
    const { data, error } = await supabase
      .from("formules")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setFormules(data as Formule[]);
    setLoading(false);
  };

  // Ajouter ou modifier une formule
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const payload = {
      nom,
      prix: Number(prix),
      description,
      elements: elements
        .split(",")
        .map((el) => el.trim())
        .filter(Boolean),
    };

    if (editingId) {
      await supabase.from("formules").update(payload).eq("id", editingId);
    } else {
      await supabase.from("formules").insert(payload);
    }

    resetForm();
    loadFormules();
  };

  const resetForm = () => {
    setNom("");
    setPrix("");
    setDescription("");
    setElements("");
    setEditingId(null);
  };

  // Préparer une modification
  const editFormule = (f: Formule) => {
    setEditingId(f.id);
    setNom(f.nom);
    setPrix(String(f.prix));
    setDescription(f.description ?? "");
    setElements(f.elements.join(", "));
  };

  // Supprimer une formule
  const deleteFormule = async (id: string) => {
    await supabase.from("formules").delete().eq("id", id);
    loadFormules();
  };

  // Activer / désactiver
  const toggleActive = async (id: string, active: boolean) => {
    await supabase.from("formules").update({ active: !active }).eq("id", id);
    loadFormules();
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <h1 className="font-specialElite text-xl mb-4">Formules de groupe</h1>

      <div className="flex flex-col md:flex-row justify-start items-start gap-10 lg:gap-24">

        {/* FORMULAIRE */}
        <form 
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 w-full sm:w-1/2 md:w-1/3"
        >
          <h2>{editingId ? "Modifier la formule" : "Créer une nouvelle formule"}</h2>

          <input
            type="text"
            placeholder="Nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />

          <input
            type="number"
            step="0.01"
            placeholder="Prix"
            value={prix}
            onChange={(e) => setPrix(e.target.value)}
            required
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <textarea
            placeholder="Éléments (séparés par des virgules)"
            value={elements}
            onChange={(e) => setElements(e.target.value)}
          />

          <button 
            type="submit"
            className="text-white bg-black py-2"
          >
            {editingId ? "Enregistrer" : "Ajouter"}
          </button>

          {editingId && (
            <button 
              type="button"  
              onClick={resetForm}
              className="text-white bg-black"
            >
              Annuler
            </button>
          )}
        </form>

        {/* LISTE DES FORMULES */}
        <div>
          <h2>Liste des formules</h2>

          {formules.map((f) => (
            <div key={f.id} style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
              <h3>
                {f.nom} — {f.prix}€
                <span style={{ marginLeft: "10px", color: f.active ? "green" : "red" }}>
                  {f.active ? "ACTIVE" : "INACTIVE"}
                </span>
              </h3>

              <p>{f.description}</p>

              <ul>
                {f.elements.map((el) => (
                  <li key={el}>{el}</li>
                ))}
              </ul>

              <div className="flex flex-row gap-5 pt-3">
                <button 
                  onClick={() => editFormule(f)}
                  className="bg-orange-400 p-1 rounded-xl"
                >
                  Modifier
                </button>
                <button 
                  onClick={() => deleteFormule(f.id)}
                  className="bg-red-400 p-1 rounded-xl"
                >
                  Supprimer
                </button>
                <button 
                  onClick={() => toggleActive(f.id, f.active)} 
                  className="bg-green-400 p-1 rounded-xl"
                >
                  {f.active ? "Désactiver" : "Activer"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
