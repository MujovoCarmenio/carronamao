import { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { corsPreflight, jsonWithCors } from '@/lib/cors';

// GET /carronamao/api/subscription/check?user_id=xxxx
export async function GET(req: NextRequest) {
  const origin = req.headers.get('origin');
  const userId = req.nextUrl.searchParams.get('user_id');

  if (!userId) {
    return jsonWithCors(
      { error: 'user_id é obrigatório' },
      { status: 400, origin }
    );
  }

  const { data, error } = await supabaseAdmin.rpc('check_subscription', {
    p_user_id: userId,
  });

  if (error) {
    console.error('[subscription/check] erro RPC:', error.message);
    return jsonWithCors(
      { error: 'Erro ao verificar subscrição' },
      { status: 500, origin }
    );
  }

  return jsonWithCors(data, { status: 200, origin });
}

export async function OPTIONS(req: NextRequest) {
  return corsPreflight(req.headers.get('origin'));
}
