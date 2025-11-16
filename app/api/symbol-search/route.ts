import type { NextRequest, NextResponse } from "next/server";

import { ValidationError } from "@/shared/api/server/errors/base-error";
import { fail } from "@/shared/api/server/http/error-response";
import { ok } from "@/shared/api/server/http/success-response";
import {
  API_PROVIDER,
  type ApiProvider,
} from "@/shared/api/server/provider/api-provider";
import { searchSymbols } from "@/shared/api/server/service/symbol.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const provider: ApiProvider = API_PROVIDER.FINNHUB;
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get("symbol") ?? "";

  if (!symbol) return fail(new ValidationError("Symbol is required"));

  try {
    const result = await searchSymbols(provider, symbol);
    return ok(result, provider);
  } catch (error) {
    return fail(error, provider);
  }
}
