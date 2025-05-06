import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are defined
if (!supabaseUrl) {
  console.error("Missing environment variable: VITE_SUPABASE_URL");
}

if (!supabaseAnonKey) {
  console.error("Missing environment variable: VITE_SUPABASE_ANON_KEY");
}

// Create Supabase client with explicit string values
export const supabase = createClient<Database>(
  supabaseUrl as string,
  supabaseAnonKey as string,
);
