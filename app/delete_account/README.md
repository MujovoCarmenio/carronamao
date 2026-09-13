# CarroNaMão — Remoção de conta

Página pública para remoção de conta, exigida pelo Google Play Console
para apps que permitem criar conta. Fluxo: email → código OTP → confirmação
explícita → conta e dados associados apagados.

## Deploy na Vercel

1. Cria um repositório no GitHub com estes ficheiros e importa-o na Vercel
   como um novo projeto (Next.js é detetado automaticamente).
2. Em **Project Settings → Environment Variables**, adiciona as 4 variáveis
   do `.env.example` (usa a Service Role Key do teu projeto Supabase —
   encontra-a em **Supabase → Project Settings → API**).
3. Em **Project Settings → Domains**, adiciona
   `carronamao.ndlovutechsolutions.com` e segue as instruções de DNS da
   Vercel (normalmente um registo CNAME apontando para `cname.vercel-dns.com`).
4. Faz deploy. A página fica em
   `https://carronamao.ndlovutechsolutions.com`.

## Configuração necessária no Supabase

No painel do Supabase, em **Authentication → Providers → Email**:
- Confirma que **"Enable Email OTP"** está ativo (é o que permite enviar
  o código de 6 dígitos, em vez de só magic link).
- Em **Authentication → Rate Limits**, os limites por defeito do Supabase
  (normalmente 1 pedido por 60s por email) já protegem contra abuso do
  botão de reenvio — não precisas de configurar nada extra para isso.

## O que a página faz

1. **Passo 1** — o utilizador introduz o email da conta. É chamado
   `supabase.auth.signInWithOtp({ shouldCreateUser: false })`, que só
   envia código se o email já corresponder a uma conta existente (mas a
   resposta ao utilizador é sempre genérica, para não revelar quais
   emails têm conta).
2. **Passo 2** — o utilizador introduz o código de 6 dígitos recebido por
   email, e marca explicitamente a checkbox a confirmar que entende que
   a ação é permanente.
3. Ao submeter, a rota `/api/account-deletion/verify-otp`:
   - Verifica o código com `supabase.auth.verifyOtp(...)` — isto prova
     que quem pediu a remoção é o dono real do email.
   - Usa a **Service Role Key** (`supabaseAdmin.auth.admin.deleteUser`)
     para apagar a conta. As foreign keys `on delete cascade` já
     existentes na tua base de dados tratam de remover automaticamente
     os anúncios de carros, carros guardados, etc., associados a esse
     `user_id` — não precisas de apagar cada tabela manualmente.

## Antes de submeter ao Google Play Console

1. **Ajusta o texto de retenção de dados** em `app/page.tsx` (procura o
   comentário `Ajusta este parágrafo`) para refletir a tua política real
   — a Google exige que fique claro o que é apagado e o que
   eventualmente é retido (e porquê, ex.: obrigações fiscais/legais).
2. **Testa o fluxo completo** em produção antes de submeter o link —
   cria uma conta de teste no app, usa esta página para a apagar, e
   confirma no Supabase (**Authentication → Users**) que o utilizador
   desapareceu e que as tabelas dependentes (`cars`, `saved_cars`) já
   não têm registos órfãos.
3. No **Google Play Console**, em **App content → Data safety** (ou
   **Account deletion**, dependendo da versão da consola), cola o URL
   completo: `https://carronamao.ndlovutechsolutions.com`.
4. Confirma que a página é acessível **sem precisar de login prévio nem
   de ter o app instalado** — é um requisito explícito da Google, e esta
   implementação já cumpre isso (não depende de sessão do app).

## Ficheiros

```
app/
  layout.tsx                              # fontes + metadata
  globals.css                             # tokens de cor/tipografia
  page.tsx                                # página principal (fluxo 3 passos)
  api/
    account-deletion/
      request-otp/route.ts                # envia o código OTP
      verify-otp/route.ts                 # confirma o código + apaga a conta
lib/
  supabaseClient.ts                       # cliente público (anon key)
  supabaseAdmin.ts                        # cliente admin (service role key)
```
