import type { NextRequest, NextResponse } from "next/server";

import type { Symbol } from "@/entities/symbol";
import { ERROR_SOURCE } from "@/server/errors/base-error";
import { ValidationError } from "@/server/errors/validation-error";
import { fail } from "@/server/http/error-response";
import type { Result } from "@/server/http/http-client";
import { ok } from "@/server/http/success-response";
import {
  API_PROVIDER,
  type ApiProvider,
} from "@/server/provider/provider.config";
import { symbolService } from "@/server/service/symbol.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest
): Promise<NextResponse<Result<Symbol[]>>> {
  const provider: ApiProvider = API_PROVIDER.FINNHUB;
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get("symbol") ?? "";

  if (!symbol) {
    return fail(
      new ValidationError("Symbol is required", {
        source: ERROR_SOURCE.CLIENT,
      })
    );
  }

  try {
    const result = await symbolService.searchSymbols(symbol);
    return ok(result, provider);
  } catch (error) {
    return fail(error, provider);
  }
}
