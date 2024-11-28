"use server"

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_API_KEY || ""
);

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
