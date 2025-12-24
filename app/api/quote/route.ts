import { ERROR_SOURCE } from "@/server/errors/base-error";
import { ValidationError } from "@/server/errors/validation-error";
import { fail, normalizeError } from "@/server/http/error-response";
import { ok } from "@/server/http/success-response";
import { quoteService } from "@/server/service/quote.service";

export async function GET(request: Request) {
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

  const result = await quoteService.getQuote(symbol);

  if (result.ok) return ok(result);
  return fail(result);
}
