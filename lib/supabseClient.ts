// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const publicAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(url, publicAnonKey)


export async function saveOpeningHours(id: number, data: any[]) {
  const { error } = await supabase
    .from("opening_hours")
    .update({ hours: data })
    .eq("id", id);

  if (error) {
    console.error("Erreur Supabase :", error);
    throw error;
  }

  console.log("Horaires enregistrés !");
}

export async function saveHolidays(restaurantId: number, periods: any[]) {
  const { data, error } = await supabase
    .from("holidays")
    .upsert(
      {
        restaurant_id: restaurantId,
        periods: periods
      },
      { onConflict: "restaurant_id" }
    );

  console.log("DATA :", data);
  console.log("ERROR :", error);

  if (error) {
    throw error;
  }
}

