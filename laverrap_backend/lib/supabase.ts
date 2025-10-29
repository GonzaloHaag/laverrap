import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/database.ts";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Supabase URL or Key is not defined in environment variables"
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
