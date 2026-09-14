# Eliminação de Conta — CarroNaMão

Fluxo completo de eliminação de conta acessível via web, exigido pelo
[Google Play](https://support.google.com/googleplay/android-developer/answer/13327111)
para apps que permitem criação de conta: tem de existir uma forma de pedir
a eliminação da conta **sem precisar de ter a app instalada**.

## Ficheiros e onde colocá-los

Tudo isto entra no teu projeto `carronamao-api` já existente:

```
ndlovu-api/
  lib/
    resend.ts                          → NOVO
  app/carronamao/
    eliminar-conta/
      page.tsx                          → NOVO — a página em si
    api/account-deletion/
      request/route.ts                   → NOVO — envia o código OTP
      confirm/route.ts                    → NOVO — confirma e elimina
  sql/
    account_deletion.sql                  → corre no SQL Editor do Supabase
```

## Passos de configuração (por ordem)

### 1. Corre o SQL no Supabase

Abre `sql/account_deletion.sql` e corre no **SQL Editor** do Supabase.

⚠️ **A função `delete_user_account` tem de ser ajustada ao teu schema
real** — usei os nomes de tabela (`cars`, `car_terms`, `subscriptions`,
`notifications`, `users`) que já discutimos nas nossas conversas
anteriores, mas confirma que batem certo antes de correres em produção.
Se alguma destas tabelas não existir ou tiver outro nome, a função falha
ao ser chamada — testa com `select delete_user_account('um-uuid-de-teste')`
num ambiente de staging primeiro.

### 2. Variável de ambiente nova

```bash
# .env / Vercel Environment Variables
RESEND_API_KEY=re_xxxxxxxxxxxx        # já deves ter esta
RESEND_FROM_EMAIL=noreply@ndlovutechsolutions.com   # opcional, tem um default
```

### 3. Storage — confirma os nomes dos buckets

Na rota `confirm/route.ts`, assumi buckets chamados `avatars` e
`car-images`, com estrutura `bucket/{user_id}/ficheiro.jpg`. Ajusta os
nomes exatos consoante o que já tens configurado no Supabase Storage.

### 4. Deploy

```bash
vercel --prod
```

O URL final fica em:
```
https://ndlovutechsolutions.com/carronamao/eliminar-conta
```

É **este URL** que colas no Play Console em:
**Play Console → o teu app → Presença na loja → Eliminação da conta**
(campo específico, diferente do da política de privacidade).

## Como o fluxo funciona

```
1. Utilizador escreve o email + marca a checkbox de confirmação
2. POST /carronamao/api/account-deletion/request
   → gera código de 6 dígitos, válido 15 min
   → envia por email via Resend
   → resposta é SEMPRE genérica (não revela se o email existe)
3. Utilizador introduz o código recebido
4. POST /carronamao/api/account-deletion/confirm
   → valida código (máx. 5 tentativas, expira em 15 min)
   → apaga ficheiros do Storage (avatar, fotos de carros)
   → chama delete_user_account() — apaga cars, car_terms, subscriptions, etc.
   → supabase.auth.admin.deleteUser() — elimina a conta de autenticação
5. Mostra confirmação de sucesso
```

## Decisões de segurança importantes

- **Nunca revela se um email tem conta** — tanto no pedido de código como
  em erros, a resposta é genérica. Isto evita que alguém use este endpoint
  público para descobrir emails registados no CarroNaMão.
- **Rate limit de 3 pedidos/hora por email** — evita abuso do envio de
  emails.
- **Máximo de 5 tentativas de código errado** — depois disso, é preciso
  pedir um código novo.
- **Ordem de eliminação**: Storage → dados relacionados (RPC atómico) →
  conta de autenticação, por último. Se algo falhar a meio, o utilizador
  ainda existe (não fica num estado "parcialmente eliminado" órfão).

## Nota sobre a política de dados do Play

O Google Play exige que a página explique claramente **que dados são
eliminados** — o `warning-box` na página já lista isto. Se o teu
`delete_user_account` vier a apagar (ou explicitamente **não** apagar)
outras categorias de dados no futuro (ex: histórico de mensagens entre
compradores/vendedores, se vieres a construir isso), atualiza também essa
lista na página para se manter precisa — o Play revê o conteúdo desta
página, não só a existência do link.
