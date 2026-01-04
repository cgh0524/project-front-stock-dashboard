import { ERROR_SOURCE } from "@/server/errors/base-error";
import { ValidationError } from "@/server/errors/validation-error";
import { fail, normalizeError } from "@/server/http/error-response";
import { ok } from "@/server/http/success-response";
import { marketPerformanceService } from "@/server/service/market-performance.service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const date = searchParams.get("date");

  if (!date) {
    return fail(
      normalizeError(
        new ValidationError("Date is required", {
          source: ERROR_SOURCE.CLIENT,
        })
      )
    );
  }

  const exchange = searchParams.get("exchange") ?? undefined;
  const sector = searchParams.get("sector") ?? undefined;

  const result = await marketPerformanceService.getMarketSectorPerformance({
    exchange,
    date,
    sector,
  });

  if (result.ok) return ok(result);
  return fail(result);
}
