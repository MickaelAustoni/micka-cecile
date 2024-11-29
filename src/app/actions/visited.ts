"use server"

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_API_KEY || ""
);

export async function setVisited(name: string | null) {
  if (!name) {
    return { success: false };
  }

  try {
    const { error } = await supabase
      .from("users")
      .upsert({ name, visited: true })
      .eq("name", name);

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
