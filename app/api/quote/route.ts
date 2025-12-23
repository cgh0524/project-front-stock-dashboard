import { ERROR_SOURCE } from "@/server/errors/base-error";
import { ValidationError } from "@/server/errors/validation-error";
import { fail } from "@/server/http/error-response";
import { ok } from "@/server/http/success-response";
import { quoteService } from "@/server/service/quote.service";
import type { ApiProvider } from "@/shared/api/provider";
import { API_PROVIDER } from "@/shared/api/provider";

export async function GET(request: Request) {
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
    const result = await quoteService.getQuote(symbol);
    return ok(result, provider);
  } catch (error) {
    return fail(error, provider);
  }
}
