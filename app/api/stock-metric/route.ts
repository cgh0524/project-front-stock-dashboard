import { ERROR_SOURCE } from "@/server/errors/base-error";
import { ValidationError } from "@/server/errors/validation-error";
import { fail, normalizeError } from "@/server/http/error-response";
import { ok } from "@/server/http/success-response";
import { stockMetricService } from "@/server/service/stock-metric.service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get("symbol") ?? "";
  const metric = searchParams.get("metric") ?? "all";

  if (!symbol) {
    return fail(
      normalizeError(
        new ValidationError("Symbol is required", {
          source: ERROR_SOURCE.CLIENT,
        })
      )
    );
  }

  if (metric !== "all") {
    return fail(
      normalizeError(
        new ValidationError("metric supports only 'all'", {
          source: ERROR_SOURCE.CLIENT,
        })
      )
    );
  }

  const result = await stockMetricService.getStockMetric(symbol);

  if (result.ok) return ok(result);
  return fail(result);
}
