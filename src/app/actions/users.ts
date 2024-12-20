"use server"

import { createClient } from "@supabase/supabase-js";

type User = {
  name: string;
  discovered?: boolean;
  info?: boolean;
  people?: number;
  presence?: boolean;
  visited?: number; // Changed from boolean to number
}

type ApiResponse<T = void> = {
  success: boolean;
  error?: unknown;
  data?: T;
}

const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_API_KEY || ""
);

export async function getUser(name: string | null): Promise<ApiResponse<User | null>> {
  if (!name) {
    return { success: false };
  }

  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("name", name)
      .maybeSingle();

    if (error) {
      return { success: false, error };
    }

    return {
      success: true,
      data: data
    };
  } catch (error) {
    return { success: false, error };
  }
}

async function updateUser(name: string, updates: Partial<User>): Promise<ApiResponse> {
  if (!name) {
    return { success: false };
  }

  try {
    const { error } = await supabase
      .from("users")
      .upsert(
        { name, ...updates },
        { onConflict: "name" }
      );

    if (error) {
      return { success: false, error };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}

export async function setDiscovered(name: string | null): Promise<ApiResponse> {
  return name ? updateUser(name, { discovered: true }) : { success: false };
}

export async function setInfo(name: string | null): Promise<ApiResponse> {
  return name ? updateUser(name, { info: true }) : { success: false };
}

export async function setVisited(name: string | null): Promise<ApiResponse> {
  if (!name) {
    return { success: false };
  }

  try {
    // Fetch current user data
    const { data: user, error: fetchError } = await supabase
      .from("users")
      .select("visited")
      .eq("name", name)
      .maybeSingle();

    if (fetchError) {
      return { success: false, error: fetchError };
    }

    // Calculate new visit count (start at 1 if no previous visits)
    const newVisitCount = ((user?.visited ?? 0) + 1);

    // Update the visit count
    return updateUser(name, { visited: newVisitCount });

  } catch (error) {
    return { success: false, error };
  }
}

export async function updatePeople(people: number, name: string | null): Promise<ApiResponse> {
  return name ? updateUser(name, { people }) : { success: false };
}

export async function updatePresence(presence: boolean, name: string | null): Promise<ApiResponse> {
  return name ? updateUser(name, { presence }) : { success: false };
}
