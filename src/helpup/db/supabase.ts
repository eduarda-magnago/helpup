import { createClient } from "@supabase/supabase-js";
import { Database } from "./types";
import {AsyncStorage} from "expo-sqlite/kv-store";

const SUPABASE_URL = "https://bdplvohutbwwjushlzji.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkcGx2b2h1dGJ3d2p1c2hsemppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3MDU3MDYsImV4cCI6MjA3NjI4MTcwNn0.e8JxhhfjZwonMB52gZNxPuDiyjBvrsqJ2bgPqFftU1g";

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  { auth: {
          storage: AsyncStorage,
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: false,
      } }
);
