"use server"

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_API_KEY || ""
);


export async function updatePeople(people: number, name?: string | null) {
  if (!name) {
    return { success: false };
  }

  try {
    const { error } = await supabase
      .from("users")
      .upsert(
        {
          name,
          people
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
