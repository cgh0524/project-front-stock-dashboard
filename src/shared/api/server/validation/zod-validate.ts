// src/shared/api/server/validation/parse-or-fail.ts
import type { z } from "zod";
import { ZodError } from "zod";

import type { ErrorSource } from "@/shared/api/server/errors/base-error";
import { ValidationError } from "@/shared/api/server/errors/validation-error";

export function parseOrFail<T>(
  schema: z.ZodSchema<T>,
  raw: unknown,
  options: {
    source: ErrorSource;
    context?: Record<string, unknown>;
  }
): T {
  try {
    return schema.parse(raw);
  } catch (err) {
    // Zod 오류를 ValidationError로 재래핑
    if (err instanceof ZodError) {
      throw new ValidationError("Upstream Payload validation failed", {
        source: options.source,
        ...options.context,
      });
    }

    throw err;
  }
}
