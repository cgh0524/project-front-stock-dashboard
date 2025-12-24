import type { NextRequest, NextResponse } from "next/server";

import type { Symbol } from "@/entities/symbol";
import { ERROR_SOURCE } from "@/server/errors/base-error";
import { ValidationError } from "@/server/errors/validation-error";
import { fail, normalizeError } from "@/server/http/error-response";
import type { Result } from "@/server/http/http-client";
import { ok } from "@/server/http/success-response";
import { symbolService } from "@/server/service/symbol.service";

export async function GET(
  request: NextRequest
): Promise<NextResponse<Result<Symbol[]>>> {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get("symbol") ?? "";

  if (!symbol) {
    return fail(
      normalizeError(
        new ValidationError("Symbol is required", {
          source: ERROR_SOURCE.CLIENT,
        })
      )
    );
  }

  const result = await symbolService.searchSymbols(symbol);

  if (result.ok) return ok(result);
  return fail(result);
}
