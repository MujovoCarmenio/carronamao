import { NextRequest } from "next/server";
import { corsPreflight, jsonWithCors } from "@/lib/cors";
import { CAR_BRANDS_DATA } from "@/data/carBrandsData";

// GET /carronamao/api/car-brands
//   → devolve a lista completa de { brand, models[] }
//
// GET /carronamao/api/car-brands?brand=Toyota
//   → devolve só os modelos dessa marca: { brand, models[] }
//
// Cache-Control agressivo: isto é dado quase estático — poupa pedidos
// repetidos ao servidor sem precisares de invalidar nada manualmente.
// stale-while-revalidate deixa servir uma versão em cache instantaneamente
// enquanto revalida em segundo plano.
const CACHE_HEADERS = {
  "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
};

export async function GET(req: NextRequest) {
  const origin = req.headers.get("origin");
  const brandParam = req.nextUrl.searchParams.get("brand");

  if (brandParam) {
    const match = CAR_BRANDS_DATA.find(
      (b) => b.brand.toLowerCase() === brandParam.toLowerCase(),
    );

    if (!match) {
      return jsonWithCors(
        { error: `Marca "${brandParam}" não encontrada` },
        { status: 404, origin },
      );
    }

    return jsonWithCors(match, { status: 200, origin, headers: CACHE_HEADERS });
  }

  // Sem ?brand — devolve tudo. Inclui também `brands` (só os nomes) para
  // poupares um .map() do lado do cliente ao popular o primeiro picker.
  return jsonWithCors(
    {
      brands: CAR_BRANDS_DATA.map((b) => b.brand),
      data: CAR_BRANDS_DATA,
    },
    { status: 200, origin, headers: CACHE_HEADERS },
  );
}

export async function OPTIONS(req: NextRequest) {
  return corsPreflight(req.headers.get("origin"));
}
