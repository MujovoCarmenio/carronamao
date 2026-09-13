// lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const roleKey = process.env.SUPABASE_ROLE_KEY;

if (!supabaseUrl || !roleKey) {
  throw new Error(
    "NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY são obrigatórias.",
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
