'use client'

import CustomHeroBanner from "@/components/CustomHeroBanner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React, { useState, useEffect } from "react";
import { Variants, motion } from "framer-motion";
import { createBrowserClient } from '@supabase/ssr';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const imagesVariants: Variants = {
  hiddenBottom: {
    y: 100,
    opacity: 0,
  },
  visibleBottom: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 0.8,
    },
  },
  hiddenLeft: {
    x: 200,
    opacity: 0,
  },
  visibleLeft: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 0.8,
    },
  },
  hiddenRight: {
    x: -200,
    opacity: 0,
  },
  visibleRight: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 0.8,
    },
  },
};

function FiestaPage() {

  const [imgFiles, setimgFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFiestaFiles() {
      try {
        console.log("=== CHARGEMENT DES MENUS BRUNCH ===");
        
        // Récupérer les fichiers de type "brunch" depuis la DB
        const { data, error } = await supabase
          .from("menu_files")
          .select("*")
          .eq("category", "brunch")
          .order("id", { ascending: true });

        console.log("Résultat query:", { data, error });

        if (error) {
          console.error("Erreur chargement fichiers:", error);
          return;
        }

        if (data && data.length > 0) {
          console.log("Fichiers trouvés:", data);
          
          // Générer les URLs publiques
          const urls = data.map((file) => {
            const { data: urlData } = supabase.storage
              .from("menus")
              .getPublicUrl(file.file_path);
            console.log("URL générée pour", file.file_path, ":", urlData.publicUrl);
            return urlData.publicUrl;
          });

          setimgFiles(urls);
        } else {
          console.log("Aucune donnée trouvée");
        }
      } catch (err) {
        console.error("Erreur:", err);
      } finally {
        setLoading(false);
      }
    }

    loadFiestaFiles();
  }, []);
  
  return (
    <>
      <Navbar />
      <CustomHeroBanner title="fiesta" colorText="#FBE9D5" colorBG="#C71D7A" />

      {/* bg-[url('/carteETE2023-1.webp')] */}
      <div className="w-full flex flex-col justify-center items-center bg-pinkLight text-cream">
        <div className="w-screen lg:w-3/5 flex flex-col md:flex-row justify-center items-center lg:space-x-20 space-y-10 md:pr-10 lg:pr-20">
          <motion.div
            initial="hiddenRight"
            whileInView="visibleRight"
            viewport={{ once: true, margin: "0%" }}
            variants={imagesVariants}
            className="lg:w-1/2 w-3/4"
          >
            <img
              src="/img/deco/11.png"
              alt=""
              className=""
            />
          </motion.div>
        
          <motion.div
            initial="hiddenLeft"
            whileInView="visibleLeft"
            viewport={{ once: true, margin: "0%" }}
            variants={imagesVariants}
            className="lg:w-1/2 w-5/6 flex flex-col justify-center items-center space-y-8"
          >
            <article className="text-justify font-specialElite">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, consectetur minus laborum inventore modi officiis nemo vitae eveniet. Ipsa distinctio tenetur autem iste eos molestiae recusandae sequi ratione asperiores fugiat.
            </article>
          </motion.div>
        </div>

        <div className="lg:w-3/5 w-11/12 flex flex-col items-center justify-center py-20 space-y-6">
          {loading ? (
            <p className="text-center font-specialElite">Chargement des menus...</p>
          ) : imgFiles.length > 0 ? (
            imgFiles.map((url, index) => (
              <img
                key={index}
                src={url}
                className="w-full object-fill"
                title={`Menu brunch ${index + 1}`}
              />
            ))
          ) : (
            <p className="text-center font-specialElite">Aucun menu disponible pour le moment.</p>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default FiestaPage;
