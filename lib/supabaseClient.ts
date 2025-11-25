// lib/supabaseClient.ts
import { createBrowserClient } from '@supabase/ssr'

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

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

export async function getFormules() {
  const { data, error } = await supabase
    .from("formules")
    .select("*")
    //.order("prix", { ascending: true, foreignTable: "numeric" });

  if (error) {
    console.error(error);
    return [];
  }

  return data.map(f => ({
    ...f,
    elements: typeof f.elements === "string" ? JSON.parse(f.elements) : f.elements
  }));
}