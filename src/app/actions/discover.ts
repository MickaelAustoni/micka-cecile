"use server"

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_API_KEY || ""
);

export async function setDiscovered(name?: string | null) {
  if (!name) {
    return { success: false };
  }


  try {
    const { error } = await supabase
      .from("users")
      .upsert(
        { name, discovered: true },
        { onConflict: 'name' } // Spécifie que "name" est la colonne pour gérer les conflits
      );

    if (error) {
      return { success: false, error };
    }

    return { success: true };
  } catch (error) {
    console.error('Error:', error);
    return {
      success: false, error
    };
  }
}
