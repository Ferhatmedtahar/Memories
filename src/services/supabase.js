import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://mfhwawranrqqjwuztfin.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1maHdhd3JhbnJxcWp3dXp0ZmluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI2NDI5MjAsImV4cCI6MjAzODIxODkyMH0.9fBInCZp9oCogg1aad8F2Te21EksyEsNQaFhb9wdNVY";

const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
