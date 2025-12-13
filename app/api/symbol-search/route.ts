import type { NextRequest, NextResponse } from "next/server";

import type { Symbol } from "@/entities/stock";
import { ERROR_SOURCE } from "@/shared/api/server/errors/base-error";
import { ValidationError } from "@/shared/api/server/errors/validation-error";
import { fail } from "@/shared/api/server/http/error-response";
import type { Result } from "@/shared/api/server/http/http-client";
import { ok } from "@/shared/api/server/http/success-response";
import {
  API_PROVIDER,
  type ApiProvider,
} from "@/shared/api/server/provider/provider.config";
import { symbolService } from "@/shared/api/server/service/symbol.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest
): Promise<NextResponse<Result<Symbol[]>>> {
  const provider: ApiProvider = API_PROVIDER.FINNHUB;
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get("symbol") ?? "";

  if (!symbol)
    return fail(
      new ValidationError("Symbol is required", {
        source: ERROR_SOURCE.CLIENT,
      })
    );

  try {
    const result = await symbolService.searchSymbols(symbol);
    return ok(result, provider);
  } catch (error) {
    return fail(error, provider);
  }
}
