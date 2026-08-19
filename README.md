# Ndlovu API

Projeto Next.js (App Router) para gerir as APIs de todos os apps da **Ndlovu Tech Solutions**
num único domínio: `ndlovutechsolutions.com`.

## Estrutura

```
app/
  carronamao/
    api/
      subscription/
        check/route.ts    → GET  /carronamao/api/subscription/check?user_id=...
        renew/route.ts    → POST /carronamao/api/subscription/renew
      payments/
        mpesa/route.ts        → POST /carronamao/api/payments/mpesa
        mpesa/webhook/route.ts → POST /carronamao/api/payments/mpesa/webhook
lib/
  supabase.ts   → cliente Supabase server-side (service role)
  cors.ts       → headers CORS reutilizáveis em todas as rotas
```

Cada pasta dentro de `app/` mapeia diretamente para um caminho de URL — por
isso `app/carronamao/api/subscription/check/route.ts` fica automaticamente
disponível em `/carronamao/api/subscription/check`.

### Adicionar um novo app no futuro

Basta criar uma nova pasta ao lado de `carronamao`, ex:

```
app/
  outroapp/
    api/
      ...
```

E fica disponível em `ndlovutechsolutions.com/outroapp/api/...`, sem
precisares de tocar em nada mais.

## Setup local

```bash
npm install
cp .env.example .env.local
# preenche as variáveis em .env.local
npm run dev
```

Testa em `http://localhost:3000/carronamao/api/subscription/check?user_id=xxx`

## Deploy na Vercel

```bash
npm install -g vercel   # se ainda não tiveres
vercel login
vercel                  # primeiro deploy (segue o wizard)
vercel --prod           # deploy de produção
```

Ou, mais simples: liga o repositório Git deste projeto diretamente no
dashboard da Vercel (Import Project).

### Variáveis de ambiente na Vercel

Vai a **Project Settings → Environment Variables** e adiciona as mesmas
chaves do `.env.example`, para os ambientes **Production** e **Preview**.

## Configurar o domínio ndlovutechsolutions.com

1. No dashboard Vercel: **Project Settings → Domains**
2. Adiciona `ndlovutechsolutions.com` (e opcionalmente `www.ndlovutechsolutions.com`)
3. Configura o DNS onde o domínio está registado:

   **Domínio raiz:**
   ```
   Tipo:  A
   Nome:  @
   Valor: 76.76.21.21
   ```

   **Subdomínio www (opcional, redireciona para o raiz):**
   ```
   Tipo:  CNAME
   Nome:  www
   Valor: cname.vercel-dns.com
   ```

4. Aguarda a verificação (a Vercel emite o certificado SSL automaticamente).

Depois disto, as rotas ficam disponíveis em:

```
https://ndlovutechsolutions.com/carronamao/api/subscription/check
https://ndlovutechsolutions.com/carronamao/api/payments/mpesa
```

## Atualizar o app CarroNaMão (Expo/React Native)

Troca o `API_BASE_URL` no app para apontar para o novo domínio:

```ts
export const API_BASE_URL = 'https://ndlovutechsolutions.com/carronamao/api';
```

## ⚠️ Não esquecer

- **Callback URL do M-Pesa**: atualiza no painel do fornecedor M-Pesa o URL
  de webhook para `https://ndlovutechsolutions.com/carronamao/api/payments/mpesa/webhook`,
  senão as confirmações de pagamento deixam de chegar.
- **CORS**: a lista de origens permitidas está em `lib/cors.ts`
  (`ALLOWED_ORIGINS`) — adiciona ali qualquer novo domínio/app que precise
  de chamar estas APIs a partir do browser.
- O domínio antigo `*.vercel.app` continua a funcionar em paralelo — não
  precisas de desativar nada até confirmares que tudo funciona no domínio novo.
