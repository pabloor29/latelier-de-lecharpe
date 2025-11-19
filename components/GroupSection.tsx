import React from "react";
import FormuleCard from "./FormuleCard";

function GroupSection() {
  return (
    <div className="w-screen bg-redWine flex flex-col justify-center items-center py-20">
      <h2 className="w-11/12 text-center leading-none text-3xl text-mustard font-specialElite tracking-wide">
        Nos formules de groupe
      </h2>

      <p className="font-specialElite text-center mt-8 w-3/5 text-mustard">
        Pour des groupes à partir de 15 personnes, nous vous proposons différentes formules.
      </p>
      <p className="font-specialElite text-center mt-4 w-3/5 text-mustard">
        Pour toutes réservations pour un groupe, veuillez générer un devis en sélectionnant le nombre de formules souhaité et le joindre à la réservation.
      </p>

      <div className="lg:w-3/5 w-4/5 flex flex-col justify-between items-center py-12">
        <div className="mb-3 w-full">
          <FormuleCard
            emoji="🍽️"
            title="Formule à 32€"
            description="Assortiment de tapas à partager (froids & chauds)."
          />
        </div>
        <div className="mb-3 w-full">
          <FormuleCard
            emoji="🍽️"
            title="Formule à 35€"
            description="apéritif : pichets de Sangria rouge ou blanche ou punch ou bière blonde (un seul choix unique pour tous). 1 VERRE/P (s'ajoute sur la base de la formule à 32€)"
          />
        </div>
        <div className="mb-3 w-full">
          <FormuleCard
            emoji="🍽️"
            title="Formule à 38€"
            description="Une bouteille de vin pour 2 personnes (sur la base de la formule à 35€)."
          />
        </div>
        <div className="mb-3 w-full">
          <FormuleCard
            emoji="🍽️"
            title="Formule à 49€"
            description="Une bouteille de champagne pour 7 personnes (sur la base de la formule à 38€)."
          />
        </div>
        <div className="mb-3 w-full">
          <FormuleCard
            emoji="🍽️"
            title="Formule à 55€"
            description="Une bouteille de champagne pour 4 personnes (sur la base de la formule à 49€)."
          />
        </div>
      </div>
    </div>
  );
}

export default GroupSection;
