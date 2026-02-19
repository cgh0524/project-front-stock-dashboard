import { NEWS_CATEGORIES, type NewsCategory } from "@/entities/news";
import { ERROR_SOURCE } from "@/server/errors/base-error";
import { ValidationError } from "@/server/errors/validation-error";
import { fail, normalizeError } from "@/server/http/error-response";
import { ok } from "@/server/http/success-response";
import { newsService } from "@/server/service/news.service";

const INVALID_VALUE = "invalid";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = parseCategory(searchParams.get("category"));

  if (category === undefined) {
    return fail(
      normalizeError(
        new ValidationError("category is required", {
          source: ERROR_SOURCE.CLIENT,
        })
      )
    );
  }

  if (category === INVALID_VALUE) {
    return fail(
      normalizeError(
        new ValidationError("category must be one of general, forex, crypto, merger", {
          source: ERROR_SOURCE.CLIENT,
        })
      )
    );
  }

  const minId = parseMinId(searchParams.get("minId"));
  if (minId === INVALID_VALUE) {
    return fail(
      normalizeError(
        new ValidationError("minId must be a non-negative integer", {
          source: ERROR_SOURCE.CLIENT,
        })
      )
    );
  }

  const result = await newsService.getNews({
    category,
    minId: minId ?? 0,
  });

  if (result.ok) return ok(result);
  return fail(result);
}

function parseCategory(
  value: string | null
): NewsCategory | undefined | typeof INVALID_VALUE {
  if (value === null || value === "") return undefined;
  return NEWS_CATEGORIES.includes(value as NewsCategory)
    ? (value as NewsCategory)
    : INVALID_VALUE;
}

function parseMinId(
  value: string | null
): number | undefined | typeof INVALID_VALUE {
  if (value === null || value === "") return undefined;
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed < 0) return INVALID_VALUE;
  return parsed;
}
