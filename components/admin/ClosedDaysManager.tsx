"use client";

import React, { useEffect, useState } from "react";
import { createBrowserClient } from '@supabase/ssr';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function ClosedDaysManager() {
  const [closedDays, setClosedDays] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const restaurantId = 1;

  // Charger les jours fermés existants
  useEffect(() => {
    async function fetchClosedDays() {
      const { data, error } = await supabase
        .from("closed_days")
        .select("days")
        .eq("restaurant_id", restaurantId)
        .single();

      if (!error && data?.days) {
        setClosedDays(data.days);
      }
    }

    fetchClosedDays();
  }, []);

  // Sauvegarder les jours fermés
  const saveClosedDays = async (days: string[]) => {
    const { error } = await supabase
      .from("closed_days")
      .upsert({
        restaurant_id: restaurantId,
        days: days,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'restaurant_id'
      });

    if (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de l'enregistrement");
    }
  };

  // Basculer un jour (fermé/ouvert)
  const toggleDay = async (date: string) => {
    let updatedDays: string[];
    
    if (closedDays.includes(date)) {
      updatedDays = closedDays.filter(d => d !== date);
    } else {
      updatedDays = [...closedDays, date];
    }
    
    setClosedDays(updatedDays);
    await saveClosedDays(updatedDays);
    setSelectedDate(null);
  };

  // Générer les jours du mois
  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];

    // Ajouter les jours vides avant le début du mois
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Ajouter tous les jours du mois
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatDisplayDate = (dateStr: string): string => {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('fr-FR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const changeMonth = (offset: number) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + offset);
    setCurrentMonth(newMonth);
  };

  const days = getDaysInMonth();
  const weekDays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  const isDateClosed = selectedDate ? closedDays.includes(selectedDate) : false;

  return (
    <div className="max-w-4xl">
      <h1 className="font-specialElite text-xl mb-4">Jours de fermeture</h1>

      {/* Navigation mois */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => changeMonth(-1)}
          className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
        >
          ←
        </button>
        
        <h2 className="text-lg font-semibold">
          {currentMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
        </h2>
        
        <button
          onClick={() => changeMonth(1)}
          className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
        >
          →
        </button>
      </div>

      {/* Calendrier */}
      <div className="bg-white border border-gray-300 rounded-lg p-4 mb-6">
        {/* Jours de la semaine */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {weekDays.map(day => (
            <div key={day} className="text-center font-semibold text-sm py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Jours du mois */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((date, index) => {
            if (!date) {
              return <div key={`empty-${index}`} className="aspect-square" />;
            }

            const dateStr = formatDate(date);
            const isClosed = closedDays.includes(dateStr);
            const isSelected = selectedDate === dateStr;
            const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));

            return (
              <button
                key={dateStr}
                onClick={() => setSelectedDate(dateStr)}
                disabled={isPast}
                className={`
                  aspect-square rounded-md border-2 flex items-center justify-center
                  transition-all duration-200 text-sm font-medium
                  ${isPast ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200' : ''}
                  ${isClosed && !isPast ? 'bg-red-500 text-white border-red-600' : ''}
                  ${!isClosed && !isPast ? 'bg-white border-gray-300 hover:border-blue-500' : ''}
                  ${isSelected ? 'ring-4 ring-blue-300' : ''}
                  ${isToday(date) && !isPast ? 'border-blue-600 font-bold' : ''}
                `}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bouton d'action */}
      {selectedDate && (
        <div className="bg-cream border border-gray-300 rounded-lg p-6">
          <p className="text-lg mb-4">
            Date sélectionnée : <strong>{formatDisplayDate(selectedDate)}</strong>
          </p>
          
          <button
            onClick={() => toggleDay(selectedDate)}
            className={`
              px-6 py-3 rounded-md text-white font-medium
              ${isDateClosed 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-red-600 hover:bg-red-700'
              }
            `}
          >
            {isDateClosed 
              ? `Réactiver les réservations pour le ${formatDisplayDate(selectedDate)}`
              : `Restaurant complet le ${formatDisplayDate(selectedDate)}`
            }
          </button>
        </div>
      )}

      {/* Légende */}
      <div className="mt-6 flex gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-red-500 border-2 border-red-600 rounded"></div>
          <span>Restaurant complet</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-white border-2 border-gray-300 rounded"></div>
          <span>Places disponibles</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-100 border-2 border-gray-200 rounded"></div>
          <span>Jour passé</span>
        </div>
      </div>
    </div>
  );
}

export default ClosedDaysManager;