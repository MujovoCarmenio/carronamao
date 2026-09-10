import { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { jsonWithCors } from '@/lib/cors';

// POST /carronamao/api/payments/mpesa/webhook
// Endpoint chamado PELO gateway M-Pesa (não pelo app) para confirmar o pagamento.
//
// IMPORTANTE: atualiza este URL no painel do fornecedor M-Pesa após migrares
// do subdomínio *.vercel.app para este domínio, senão as confirmações não chegam.
export async function POST(req: NextRequest) {
  let payload: {
    reference?: string;
    status?: 'success' | 'failed';
    transaction_id?: string;
    user_id?: string;
    amount?: number;
    email?: string;
  };

  try {
    payload = await req.json();
  } catch {
    return jsonWithCors({ error: 'JSON inválido' }, { status: 400 });
  }

  // TODO: validar assinatura/segredo do webhook aqui, conforme a
  // documentação do teu fornecedor M-Pesa, antes de confiar no payload.

  if (!payload.reference || !payload.status) {
    return jsonWithCors(
      { error: 'reference e status são obrigatórios' },
      { status: 400 }
    );
  }

  if (payload.status === 'success') {
    const { error } = await supabaseAdmin.rpc('renew_subscription', {
      p_user_id: payload.user_id,
      p_plan_id: null,
    });

    if (error) {
      console.error('[mpesa/webhook] erro ao renovar subscrição:', error.message);
      return jsonWithCors(
        { error: 'Erro ao processar confirmação' },
        { status: 500 }
      );
    }

    // Envio do email de confirmação via Resend acontece aqui,
    // reaproveitando a integração que já tens configurada.
    // await sendPaymentConfirmationEmail(payload.email, payload.amount);
  }

  return jsonWithCors({ received: true }, { status: 200 });
}
