import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cibvfmmpuoxqrlbybwkn.supabase.co";

const supabaseKey =
  "sb_publishable_fNR-sYEqHmXSKEK5YxbhWw_dZAPjaIu";
  console.log("SUPABASE URL =", supabaseUrl);

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);