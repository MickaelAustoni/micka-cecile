"use server"

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_API_KEY || ""
);

export async function getPresence(name: string) {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("presence")
      .eq("name", name)
      .maybeSingle(); // retourne null si aucun résultat trouvé

    if (error) {
      return {
        success: false,
        error
      };
    }

    return {
      success: true,
      presence: data?.presence,
      hasResponded: data !== null
    };
  } catch (error) {
    return { success: false, error };
  }
}

export async function updatePresence(presence: boolean, name: string) {
  try {
    const { error } = await supabase
      .from("users")
      .upsert(
        {
          name: name,
          presence: presence
        },
        {
          onConflict: "name"
        }
      );

    if (error) {
      return {
        success: false,
        error };
    }

    return { success: true };
  } catch (error) {
    return {success: false, error };
  }
}
