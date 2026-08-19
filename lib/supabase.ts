import { createClient } from '@supabase/supabase-js';

// Usa a SERVICE_ROLE key (nunca a anon key) porque estas rotas correm no
// servidor e precisam de bypassar RLS para operações como confirmar
// pagamentos ou renovar subscrições em nome do utilizador.
const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error(
    'SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY têm de estar definidas nas variáveis de ambiente.'
  );
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
