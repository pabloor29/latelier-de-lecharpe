"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabseClient";

const MENU_TYPES = ["brunch", "diner", "fiesta"] as const;
type MenuType = (typeof MENU_TYPES)[number];

export default function MenuChange() {
  const [files, setFiles] = useState<Record<MenuType, File[]>>({
    brunch: [],
    diner: [],
    fiesta: [],
  });

  const [existingFiles, setExistingFiles] = useState<
    Record<MenuType, { id: number; file_path: string }[]>
  >({
    brunch: [],
    diner: [],
    fiesta: [],
  });

  // Charger les fichiers déjà enregistrés
  useEffect(() => {
    async function loadFiles() {
      const { data, error } = await supabase.from("menu_files").select("*");

      if (!error && data) {
        const grouped: any = { brunch: [], diner: [], fiesta: [] };

        data.forEach((f: any) => {
          if (MENU_TYPES.includes(f.category)) {
            grouped[f.category].push(f);
          }
        });

        setExistingFiles(grouped);
      }
    }

    loadFiles();
  }, []);

  // Quand des fichiers sont choisis
  const handleFileChange = (type: MenuType, e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (!selected) return;

    const arr: File[] = [];
    for (let i = 0; i < selected.length; i++) {
      arr.push(selected[i]);
    }

    setFiles((prev) => ({
      ...prev,
      [type]: arr,
    }));
  };

  const uploadMenuFiles = async () => {
    for (const type of MENU_TYPES) {
      for (const file of files[type]) {
        const filePath = `${type}/${Date.now()}-${file.name}`;

        // Upload dans Supabase Storage
        const { error: uploadErr } = await supabase.storage
          .from("menus")
          .upload(filePath, file);

        if (uploadErr) {
          console.error("Erreur upload :", uploadErr);
          alert("Erreur upload : " + uploadErr.message);
          return;
        }

        // Insertion en base
        const { error: insertErr } = await supabase
          .from("menu_files")
          .insert({
            category: type,
            file_path: filePath,
          });

        if (insertErr) {
          console.error("Erreur DB :", insertErr);
          alert("Erreur DB : " + insertErr.message);
          return;
        }
      }
    }

    alert("Menus mis à jour !");
    window.location.reload();
  };

  const deleteFile = async (fileId: number, filePath: string, type: MenuType) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        alert("Vous devez être connecté pour supprimer des fichiers");
        return;
      }

      console.log("=== DÉBUT SUPPRESSION ===");
      console.log("Chemin complet :", filePath);
      
      // Lister TOUS les fichiers du bucket (pas juste un dossier)
      const { data: listAll, error: listAllError } = await supabase.storage
        .from("menus")
        .list('', {
          limit: 1000,
          offset: 0,
        });
      
      console.log("TOUS les fichiers/dossiers à la racine :", listAll);
      
      // Lister dans le dossier brunch spécifiquement
      const { data: listBrunch, error: listBrunchError } = await supabase.storage
        .from("menus")
        .list('brunch', {
          limit: 1000,
        });
      
      console.log("Fichiers dans brunch/ :", listBrunch);
      
      // Supprimer dans le storage
      const { data: storageData, error: storageError } = await supabase.storage
        .from("menus")
        .remove([filePath]);
      
      console.log("Résultat suppression :", { data: storageData, error: storageError });
      console.log("=== FIN SUPPRESSION ===");
      
      if (storageError) {
        console.error("Erreur suppression bucket :", storageError);
        alert("Erreur suppression fichier dans le bucket : " + storageError.message);
        return;
      }

      // Supprimer de la DB
      const { error: dbError } = await supabase
        .from("menu_files")
        .delete()
        .eq("id", fileId);

      if (dbError) {
        console.error("Erreur suppression DB :", dbError);
        alert("Erreur suppression de la base de données : " + dbError.message);
        return;
      }

      // Mettre à jour l'état local
      setExistingFiles((prev) => ({
        ...prev,
        [type]: prev[type].filter((f) => f.id !== fileId),
      }));

      alert("Fichier supprimé avec succès !");
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      alert("Une erreur inattendue s'est produite");
    }
  };


  return (
    <div>
      <h1 className="font-specialElite text-xl mb-4">Mise à jour des menus</h1>

      {MENU_TYPES.map((type) => (
        <div key={type} className="mb-8 border p-4 rounded-md">
          <h2 className="text-lg font-semibold capitalize">{type}</h2>

          {/* Upload */}
          <input
            type="file"
            multiple
            accept="image/*,application/pdf"
            onChange={(e) => handleFileChange(type, e)}
            className="mt-2"
          />

          {/* Affichage fichiers déjà enregistrés */}
          <h3 className="mt-4 font-medium">Fichiers existants :</h3>
          <ul>
            {existingFiles[type].map((f) => {
              const { data } = supabase.storage.from("menus").getPublicUrl(f.file_path);
              const publicUrl = data?.publicUrl ?? "#";
              return (
                <li key={f.id} className="flex items-center justify-between mt-1">
                  <a href={publicUrl} target="_blank" className="underline text-blue-600">
                    {f.file_path}
                  </a>
                  <button
                    onClick={() => deleteFile(f.id, f.file_path, type)}
                    className="ml-2 text-red-600"
                  >
                    Supprimer
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      <button
        onClick={uploadMenuFiles}
        className="bg-black text-white px-4 py-2 rounded-md"
      >
        Enregistrer les menus
      </button>
    </div>
  );
}
