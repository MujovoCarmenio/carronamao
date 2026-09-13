// app/api/account-deletion/verify-otp/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createAnonClient } from "@/lib/supabaseClient";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: { email?: string; code?: string };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Pedido inválido." }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  const code = body.code?.trim();

  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { error: "Email inválido." },
      { status: 400 },
    );
  }

  if (!code || !/^\d{6}$/.test(code)) {
    return NextResponse.json(
      { error: "O código deve ter 6 dígitos." },
      { status: 400 },
    );
  }

  const supabase = createAnonClient();

  // Verifica o código OTP — isto confirma que quem está a pedir a remoção
  // é de facto o dono do email (prova de posse da caixa de correio).
  const { data: verifyData, error: verifyError } =
    await supabase.auth.verifyOtp({
      email,
      token: code,
      type: "email",
    });

  if (verifyError || !verifyData.user) {
    return NextResponse.json(
      { error: "Código inválido ou expirado. Solicita um novo código." },
      { status: 401 },
    );
  }

  const userId = verifyData.user.id;

  // Apaga a conta com privilégios de administrador. Os registos
  // dependentes (anúncios de carros, favoritos, etc.) são removidos
  // automaticamente pelas foreign keys "on delete cascade" na base de
  // dados — não é preciso apagar cada tabela manualmente aqui.
  const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(
    userId,
  );

  if (deleteError) {
    console.error("[verify-otp] Erro ao apagar utilizador:", deleteError.message);
    return NextResponse.json(
      {
        error:
          "Não foi possível concluir a remoção da conta. Tenta novamente ou contacta o suporte.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    message: "A tua conta e os dados associados foram removidos com sucesso.",
  });
}
