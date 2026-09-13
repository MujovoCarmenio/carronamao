import { NextRequest } from "next/server";
import { corsPreflight, jsonWithCors } from "@/lib/cors";
import { supabaseAdmin } from "@/lib/supabase";

const MAX_ATTEMPTS = 5;

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");

  let body: { email?: string; code?: string };
  try {
    body = await req.json();
  } catch {
    return jsonWithCors({ error: "JSON inválido" }, { status: 400, origin });
  }

  const email = body.email?.trim().toLowerCase();
  const code = body.code?.trim();

  if (!email || !code || code.length !== 6) {
    return jsonWithCors(
      { error: "Email e código de 6 dígitos são obrigatórios" },
      { status: 400, origin },
    );
  }

  // Busca o pedido mais recente para este email
  const { data: request, error: fetchError } = await supabaseAdmin
    .from("account_deletion_requests")
    .select("*")
    .eq("email", email)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (fetchError || !request) {
    return jsonWithCors(
      { error: "Nenhum pedido de eliminação encontrado para este email. Solicita um novo código." },
      { status: 400, origin },
    );
  }

  if (new Date(request.expires_at) < new Date()) {
    return jsonWithCors(
      { error: "Código expirado. Solicita um novo código." },
      { status: 400, origin },
    );
  }

  if (request.attempts >= MAX_ATTEMPTS) {
    return jsonWithCors(
      { error: "Demasiadas tentativas. Solicita um novo código." },
      { status: 429, origin },
    );
  }

  if (request.otp_code !== code) {
    await supabaseAdmin
      .from("account_deletion_requests")
      .update({ attempts: request.attempts + 1 })
      .eq("id", request.id);

    return jsonWithCors(
      { error: "Código incorreto." },
      { status: 400, origin },
    );
  }

  // ── Código correto — procede à eliminação real ──────────────────
  const { data: userList } = await supabaseAdmin.auth.admin.listUsers();
  const user = userList?.users?.find(
    (u) => u.email?.toLowerCase() === email,
  );

  if (!user) {
    // O pedido era válido mas a conta já não existe (ex: já foi
    // eliminada antes). Limpa o pedido e informa com uma mensagem
    // ainda assim genérica.
    await supabaseAdmin
      .from("account_deletion_requests")
      .delete()
      .eq("id", request.id);

    return jsonWithCors(
      { error: "Não foi possível localizar esta conta. Pode já ter sido eliminada." },
      { status: 400, origin },
    );
  }

  // 1. Apaga ficheiros do Storage associados ao utilizador (avatar,
  //    fotos de carros) — ajusta os nomes de bucket/paths ao teu setup real.
  try {
    const { data: avatarFiles } = await supabaseAdmin.storage
      .from("carronamao/avatar")
      .list(user.id);

    if (avatarFiles && avatarFiles.length > 0) {
      await supabaseAdmin.storage
        .from("carronamao/avatar")
        .remove(avatarFiles.map((f) => `${user.id}/${f.name}`));
    }

    const { data: carImageFiles } = await supabaseAdmin.storage
      .from("carronamao/cars")
      .list(user.id);

    if (carImageFiles && carImageFiles.length > 0) {
      await supabaseAdmin.storage
        .from("carronamao/cars")
        .remove(carImageFiles.map((f) => `${user.id}/${f.name}`));
    }
  } catch (err) {
    // Não bloqueia a eliminação da conta por causa disto — regista e continua.
    console.error("[account-deletion/confirm] erro ao limpar storage:", err);
  }

  // 2. Elimina dados relacionados (cars, terms_of_work, subscriptions, etc.)
  //    de forma atómica via RPC
  const { error: rpcError } = await supabaseAdmin.rpc("delete_user_account", {
    p_user_id: user.id,
  });

  if (rpcError) {
    console.error("[account-deletion/confirm] erro no RPC:", rpcError.message);
    return jsonWithCors(
      { error: "Erro ao eliminar dados da conta. Tenta novamente ou contacta o suporte." },
      { status: 500, origin },
    );
  }

  // 3. Elimina o utilizador da auth do Supabase — só depois de tudo o
  //    resto ter sido removido com sucesso
  const { error: deleteAuthError } = await supabaseAdmin.auth.admin.deleteUser(
    user.id,
  );

  if (deleteAuthError) {
    console.error(
      "[account-deletion/confirm] erro ao eliminar utilizador:",
      deleteAuthError.message,
    );
    return jsonWithCors(
      { error: "Erro ao eliminar a conta. Contacta o suporte." },
      { status: 500, origin },
    );
  }

  // 4. Limpa o próprio pedido de eliminação
  await supabaseAdmin
    .from("account_deletion_requests")
    .delete()
    .eq("email", email);

  return jsonWithCors({ success: true }, { status: 200, origin });
}

export async function OPTIONS(req: NextRequest) {
  return corsPreflight(req.headers.get("origin"));
}
