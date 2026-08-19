import { NextResponse } from 'next/server';

// Lista de origens permitidas a chamar as APIs.
// Em produção, evita usar '*' — lista explicitamente os domínios/apps que podem chamar.
const ALLOWED_ORIGINS = [
  'https://ndlovutechsolutions.com',
  'https://www.ndlovutechsolutions.com',
  // App Expo/React Native normalmente não envia 'Origin' de forma fiável em produção
  // (chama diretamente via fetch nativo), mas mantemos para testes web/Expo Go.
  'http://localhost:19006',
  'http://localhost:3000',
];

export function corsHeaders(origin?: string | null) {
  const allowOrigin =
    origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];

  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

// Resposta padrão para pedidos OPTIONS (preflight)
export function corsPreflight(origin?: string | null) {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(origin),
  });
}

// Wrapper para devolver JSON já com os headers de CORS aplicados
export function jsonWithCors(
  data: unknown,
  init: { status?: number; origin?: string | null } = {}
) {
  const { status = 200, origin } = init;
  return NextResponse.json(data, {
    status,
    headers: corsHeaders(origin),
  });
}
