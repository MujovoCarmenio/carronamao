import { NextResponse } from "next/server";

const ALLOWED_ORIGINS = [
  "https://ndlovutechsolutions.com",
  "https://www.ndlovutechsolutions.com",
  "http://localhost:19006",
  "http://localhost:3000",
];

export function corsHeaders(origin?: string | null) {
  const allowOrigin =
    origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];

  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

export function corsPreflight(origin?: string | null) {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(origin),
  });
}

// 👈 alterado — aceita agora um `headers` extra (ex: Cache-Control),
// mesclado com os headers de CORS.
export function jsonWithCors(
  data: unknown,
  init: {
    status?: number;
    origin?: string | null;
    headers?: Record<string, string>;
  } = {},
) {
  const { status = 200, origin, headers = {} } = init;

  return NextResponse.json(data, {
    status,
    headers: {
      ...corsHeaders(origin),
      ...headers,
    },
  });
}
