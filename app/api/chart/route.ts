import type { ChartInterval } from "@/entities/chart";
import { ERROR_SOURCE } from "@/server/errors/base-error";
import { ValidationError } from "@/server/errors/validation-error";
import { fail, normalizeError } from "@/server/http/error-response";
import { ok } from "@/server/http/success-response";
import { chartService } from "@/server/service/chart.service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const symbol = searchParams.get("symbol") ?? "";
  const fromDate = searchParams.get("fromDate");

  if (!symbol) {
    return fail(
      normalizeError(
        new ValidationError("Symbol is required", {
          source: ERROR_SOURCE.CLIENT,
        })
      )
    );
  }

  if (!fromDate) {
    return fail(
      normalizeError(
        new ValidationError("fromDate is required", {
          source: ERROR_SOURCE.CLIENT,
        })
      )
    );
  }

  const toDate = searchParams.get("toDate") ?? undefined;
  const interval = parseChartInterval(searchParams.get("interval"));
  const includePrePost = parseIncludePrePost(
    searchParams.get("includePrePost")
  );

  if (includePrePost === INVALID_VALUE) {
    return fail(
      normalizeError(
        new ValidationError("includePrePost must be true or false", {
          source: ERROR_SOURCE.CLIENT,
        })
      )
    );
  }

  if (interval === INVALID_VALUE) {
    return fail(
      normalizeError(
        new ValidationError("interval is invalid", {
          source: ERROR_SOURCE.CLIENT,
        })
      )
    );
  }

  const result = await chartService.getChart(symbol, {
    fromDate,
    toDate,
    interval,
    includePrePost,
  });

  if (result.ok) return ok(result);
  return fail(result);
}

const INVALID_VALUE = "invalid";

function parseChartInterval(
  value: string | null
): ChartInterval | undefined | typeof INVALID_VALUE {
  if (value === null) return undefined;
  const allowed: ChartInterval[] = ["1m", "5m", "15m", "60m", "1d", "1wk", "1mo"];
  return allowed.includes(value as ChartInterval)
    ? (value as ChartInterval)
    : INVALID_VALUE;
}

function parseIncludePrePost(
  value: string | null
): boolean | undefined | typeof INVALID_VALUE {
  if (value === null) return undefined;
  if (value === "true") return true;
  if (value === "false") return false;
  return INVALID_VALUE;
}
