// lib/supabaseAdmin.ts
//
// ⚠️ Este cliente usa a SERVICE ROLE KEY do Supabase — tem acesso total,
// sem restrições de RLS. Só pode ser importado dentro de código que
// corre no servidor (rotas em app/api/**/route.ts). NUNCA importar isto
// num componente "use client" nem expor a env var com prefixo NEXT_PUBLIC_.
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error(
    "SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY são obrigatórias (define-as nas Environment Variables do projeto na Vercel).",
  );
}

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
