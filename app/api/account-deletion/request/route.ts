import { NextRequest } from "next/server";
import { corsPreflight, jsonWithCors } from "@/lib/cors";
import { supabaseAdmin } from "@/lib/supabase";
import { sendEmail } from "@/lib/resend";

const OTP_TTL_MINUTES = 15;
const MAX_REQUESTS_PER_HOUR = 3; // proteção simples contra abuso/spam

function generateOtp(): string {
  return String(Math.floor(100000 + Math.random() * 900000)); // 6 dígitos
}

function buildEmailHtml(code: string): string {
  return `
  <div style="font-family: Inter, sans-serif; background: #0A0E14; padding: 40px 20px;">
    <div style="max-width: 480px; margin: 0 auto; background: #101622; border-radius: 16px; overflow: hidden; border: 1px solid #172540;">
      <div style="background: #17202F; padding: 24px 32px; text-align: center;">
        <div style="color: #FFFFFF; font-size: 18px; font-weight: 700;">CarroNaMão</div>
      </div>
      <div style="padding: 32px;">
        <p style="color: #FFFFFF; font-size: 17px; font-weight: 600; margin: 0 0 8px;">
          Confirmar eliminação de conta
        </p>
        <p style="color: #8A93A6; font-size: 14px; line-height: 22px; margin: 0 0 24px;">
          Recebemos um pedido para eliminar permanentemente a tua conta
          CarroNaMão. Usa o código abaixo para confirmar.
        </p>
        <div style="background: #172540; border: 1px solid #ef4444; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 24px;">
          <div style="color: #8A93A6; font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 10px;">
            Código de confirmação
          </div>
          <div style="color: #FFFFFF; font-size: 34px; font-weight: 700; letter-spacing: 8px; font-family: monospace;">
            ${code}
          </div>
        </div>
        <p style="color: #8A93A6; font-size: 13px; line-height: 20px; margin: 0 0 4px;">
          ⏱️ Este código expira em ${OTP_TTL_MINUTES} minutos.
        </p>
        <p style="color: #ef4444; font-size: 13px; line-height: 20px; margin: 0 0 24px;">
          ⚠️ Esta ação é permanente e não pode ser desfeita.
        </p>
        <p style="color: #5C6479; font-size: 12px; line-height: 18px; margin: 0;">
          Se não pediste isto, ignora este email — a tua conta mantém-se
          intacta e nenhuma alteração será feita.
        </p>
      </div>
    </div>
  </div>`;
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");

  let body: { email?: string };
  try {
    body = await req.json();
  } catch {
    return jsonWithCors({ error: "JSON inválido" }, { status: 400, origin });
  }

  const email = body.email?.trim().toLowerCase();
  if (!email || !email.includes("@")) {
    return jsonWithCors({ error: "Email inválido" }, { status: 400, origin });
  }

  // Resposta SEMPRE genérica — nunca revela se o email existe ou não
  // na base de dados. Isto evita que alguém use este endpoint para
  // descobrir que emails têm conta no CarroNaMão.
  const genericResponse = {
    message:
      "Se existir uma conta associada a este email, um código de confirmação foi enviado.",
  };

  // Rate limit simples — impede reenvios excessivos para o mesmo email
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count } = await supabaseAdmin
    .from("account_deletion_requests")
    .select("id", { count: "exact", head: true })
    .eq("email", email)
    .gte("created_at", oneHourAgo);

  if ((count ?? 0) >= MAX_REQUESTS_PER_HOUR) {
    // Ainda devolve resposta genérica — não denuncia rate limit a quem
    // está a tentar abusar do endpoint.
    return jsonWithCors(genericResponse, { status: 200, origin });
  }

  // Confirma se existe mesmo uma conta com este email antes de gastar
  // uma chamada ao Resend — mas isto nunca é exposto na resposta.
  const { data: userList } = await supabaseAdmin.auth.admin.listUsers();
  const userExists = userList?.users?.some(
    (u) => u.email?.toLowerCase() === email,
  );

  if (userExists) {
    const code = generateOtp();
    const expiresAt = new Date(
      Date.now() + OTP_TTL_MINUTES * 60 * 1000,
    ).toISOString();

    await supabaseAdmin.from("account_deletion_requests").insert({
      email,
      otp_code: code,
      expires_at: expiresAt,
    });

    await sendEmail({
      to: email,
      subject: "Confirma a eliminação da tua conta — CarroNaMão",
      html: buildEmailHtml(code),
    });
  }

  return jsonWithCors(genericResponse, { status: 200, origin });
}

export async function OPTIONS(req: NextRequest) {
  return corsPreflight(req.headers.get("origin"));
}
