import { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { corsPreflight, jsonWithCors } from '@/lib/cors';

// POST /carronamao/api/subscription/renew
// body: { user_id: string, plan_id?: string }
export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin');

  let body: { user_id?: string; plan_id?: string };
  try {
    body = await req.json();
  } catch {
    return jsonWithCors({ error: 'JSON inválido' }, { status: 400, origin });
  }

  if (!body.user_id) {
    return jsonWithCors(
      { error: 'user_id é obrigatório' },
      { status: 400, origin }
    );
  }

  const { data, error } = await supabaseAdmin.rpc('renew_subscription', {
    p_user_id: body.user_id,
    p_plan_id: body.plan_id ?? null,
  });

  if (error) {
    console.error('[subscription/renew] erro RPC:', error.message);
    return jsonWithCors(
      { error: 'Erro ao renovar subscrição' },
      { status: 500, origin }
    );
  }

  return jsonWithCors(data, { status: 200, origin });
}

export async function OPTIONS(req: NextRequest) {
  return corsPreflight(req.headers.get('origin'));
}
