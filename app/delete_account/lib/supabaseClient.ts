// lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const roleKey = process.env.SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !roleKey) {
  throw new Error(
    "SUPABASE_URL e SUPABASE_PUBLISHABLE_KEY são obrigatórias.",
  );
}

// Usado só no servidor (dentro das rotas de API), com autoRefreshToken e
// persistSession desligados — cada pedido é isolado, sem estado partilhado
// entre utilizadores diferentes.
export function createAnonClient() {
  return createClient(supabaseUrl!, roleKey!, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
