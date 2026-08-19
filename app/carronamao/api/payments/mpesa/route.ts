import { NextRequest } from 'next/server';
import { corsPreflight, jsonWithCors } from '@/lib/cors';

const MPESA_API_URL = process.env.MPESA_API_URL as string;
const MPESA_API_KEY = process.env.MPESA_API_KEY as string;
const RESEND_API_KEY = process.env.RESEND_API_KEY as string;
const MPESA_TIMEOUT_MS = 30_000;

// POST /carronamao/api/payments/mpesa
// body: { phone: string, amount: number, user_id: string, reference: string }
export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin');

  let body: {
    phone?: string;
    amount?: number;
    reference?: string;
  };
  try {
    body = await req.json();
  } catch {
    return jsonWithCors({ error: 'JSON inválido' }, { status: 400, origin });
  }

  console.log('[payments/mpesa] body recebido:', body);

  if (!body.phone || !body.amount || !body.reference) {
console.error('[payments/mpesa] validação falhou:', {
    	phone: body.phone,
    	amount: body.amount,
    	reference: body.reference,
  });
    return jsonWithCors(
      { error: 'phone, amount, e reference são obrigatórios' },
      { status: 400, origin }
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), MPESA_TIMEOUT_MS);

  try {
    const mpesaResponse = await fetch(MPESA_API_URL, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
	carteira: MPESA_API_KEY,
        numero: body.phone,
        valor: body.amount,
      }),
    });

    clearTimeout(timeout);

    if (!mpesaResponse.ok) {
      const errorText = await mpesaResponse.text();
      console.error('[payments/mpesa] gateway erro:', errorText);
      return jsonWithCors(
        { error: 'Falha ao iniciar pagamento M-Pesa' },
        { status: 502, origin }
      );
    }

    const data = await mpesaResponse.json();
    console.log('[payments/mpesa] resposta do gateway:', JSON.stringify(data));
    // Normaliza a resposta do gateway (status: "sucesso"/"falha") para o
    // formato { success, error } que o cliente (useSubscription) espera.
    const isSuccess = data.status === 'sucesso' || data.statusCode === 200;

	if (isSuccess && email && RESEND_API_KEY) {
            const resend = new Resend(RESEND_API_KEY);

            await resend.emails.send({
                from:
                    "CarroNaMão <noreply@ndlovutechsolutions.com>",
                to: email,
                subject: "✅ Pagamento confirmado — CarroNaMão",
                html: emailTemplate({
                    nome: nome ?? "Cliente",
                    valor,
                    reference,
                    numero,
                }),
            });
        }

    return jsonWithCors(
      {
        success: isSuccess,
        error: isSuccess ? undefined : (data.message ?? 'Erro no pagamento M-Pesa'),
        ...data, // mantém os campos originais disponíveis (status, statusCode, message) para debug/log no cliente se precisares
      },
      { status: 200, origin }
);  } catch (err) {
    clearTimeout(timeout);

    if (err instanceof Error && err.name === 'AbortError') {
      console.error('[payments/mpesa] timeout ao contactar gateway M-Pesa');
      return jsonWithCors(
        { error: 'Tempo limite excedido ao contactar M-Pesa' },
        { status: 504, origin }
      );
    }

    console.error('[payments/mpesa] erro inesperado:', err);
    return jsonWithCors(
      { error: 'Erro inesperado ao processar pagamento' },
      { status: 500, origin }
    );
  }
}

function emailTemplate({
    nome,
    valor,
    reference,
    numero,
}: {
    nome: string;
    valor: number;
    reference: string;
    numero: string;
}) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body        { font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        background-color: #101622;
        margin: 0;
        padding: 0;
        color: #ffffff; }
        .container  { max-width: 600px;
        margin: 40px auto;
        background-color: #1e293b;
        border-radius: 16px;
        border: 1px solid #334155;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); }
        .header {
        padding: 24px;
        background-color: #101622;
        border-bottom: 1px solid #334155;
      }
      .header h1 {
        margin: 0;
        color: #3b82f6;
        font-size: 26px;
        font-weight: bold;
        letter-spacing: 1px;
      }
        .body       { padding: 40px 32px;
        text-align: center; }
        .badge      { background: #d1fae5; color: #065f46; padding: 8px 16px; border-radius: 20px; display: inline-block; font-weight: bold; margin-bottom: 24px; }
        .detail     { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #f0f0f0; }
        .label      { color: #6b7280; font-size: 14px; }
        .value      { font-weight: 600; color: #fff; }
        .footer {
        padding: 24px;
        text-align: center;
        font-size: 13px;
        color: #6b7280;
        border-top: 1px solid #334155;
        background-color: #101622;
      }
        .amount     { font-size: 36px; font-weight: 800; color: #1152D4; text-align: center; margin: 24px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td width="50" valign="middle" style="padding-right: 12px">
              <img
                src="https://tdtudeklstqvpkspvrci.supabase.co/storage/v1/object/public/carronamao/icon-192.png"
                alt="CarroNaMão Logo"
                width="40"
                style="display: block; border: 0"
              />
            </td>
            <td valign="middle">
              <h1>CarroNaMão</h1>
            </td>
          </tr>
        </table>
      </div>
        <div class="body">
          <p>Olá, <strong>${nome}</strong>!</p>
          <div class="badge">✅ Pagamento confirmado</div>
          <p>O teu pagamento foi processado com sucesso.</p>

          <div class="amount">MT ${valor.toLocaleString("pt-MZ")}</div>

          <div class="detail">
            <span class="label">Referência</span>
            <span class="value">${reference}</span>
          </div>
          <div class="detail">
            <span class="label">Número</span>
            <span class="value">${numero}</span>
          </div>
          <div class="detail">
            <span class="label">Valor</span>
            <span class="value">MT ${valor}</span>
          </div>
          <div class="detail">
            <span class="label">Estado</span>
            <span class="value" style="color:#10b981">✅ Confirmado</span>
          </div>

          <p style="margin-top: 24px; color: #6b7280; font-size: 14px;">
            Guarda este email como comprovativo do teu pagamento.
          </p>
        </div>
        <div class="footer">
          <p>&copy; 2026 CarroNaMão - by Ndlovu Tech Solutions</p>
          <p>Este é um email automático, não responda.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export async function OPTIONS(req: NextRequest) {
  return corsPreflight(req.headers.get('origin'));
}
