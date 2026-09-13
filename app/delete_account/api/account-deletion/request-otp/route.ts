// app/api/account-deletion/request-otp/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createAnonClient } from "@/lib/supabaseClient";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Mensagem genérica em ambos os casos (conta existe ou não) — evita dar
// a quem faz o pedido uma forma de descobrir que emails estão registados
// (enumeration attack).
const GENERIC_SUCCESS_MESSAGE =
  "Se este email estiver associado a uma conta CarroNaMão, enviámos um código de confirmação.";

export async function POST(req: NextRequest) {
  let body: { email?: string };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Pedido inválido." }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();

  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { error: "Introduz um email válido." },
      { status: 400 },
    );
  }

  const supabase = createAnonClient();

  // shouldCreateUser: false — nunca cria conta nova a partir daqui; só
  // envia o código se o email já corresponder a uma conta existente.
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { shouldCreateUser: false },
  });

  // Independentemente do resultado (erro "user not found" incluído),
  // devolvemos sempre a mesma mensagem genérica ao cliente.
  if (error) {
    console.error("[request-otp] Supabase error:", error.message);
  }

  return NextResponse.json({ message: GENERIC_SUCCESS_MESSAGE });
}
