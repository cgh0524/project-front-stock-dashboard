import type { ApiProvider } from "@/shared/api/server/provider/api-provider";

import type { BffError } from "./bff-error";
import { toBffError } from "./bff-error";
import { CANONICAL_STATUS } from "./error-codes";

export class ProviderError extends Error {
  readonly code: number;
  readonly body: string;
  readonly provider: ApiProvider;
  readonly url: string;

  constructor(
    code: number,
    body: string,
    { provider, url }: { provider: ApiProvider; url: string }
  ) {
    super(`Provider responded with HTTP ${code}`);
    this.name = "ProviderHttpError";
    this.code = code;
    this.body = body;
    this.provider = provider;
    this.url = url;
  }
}

export const toBffProviderError = (
  provider: ApiProvider,
  error: ProviderError
): BffError => {
  if (error.code === 429) {
    return toBffError(
      provider,
      CANONICAL_STATUS.RATE_LIMITED,
      "Rate limit exceeded. Please try again later.",
      {
        retryable: true,
      }
    );
  }

  if (error.code === 404) {
    return toBffError(
      provider,
      CANONICAL_STATUS.NOT_FOUND,
      "Requested resource was not found.",
      {
        retryable: false,
      }
    );
  }

  if (error.code === 401 || error.code === 403) {
    return toBffError(
      provider,
      CANONICAL_STATUS.UNAUTHORIZED,
      "Provider authentication failed. Please verify credentials.",
      { retryable: false }
    );
  }

  if (error.code >= 400 && error.code < 500) {
    return toBffError(
      provider,
      CANONICAL_STATUS.INVALID_REQUEST,
      "Invalid request was sent to provider. Check input values.",
      { retryable: false }
    );
  }

  // Not Implemented
  const is501 = error.code === 501;
  // Upstream Timeout
  const is504 = error.code === 504;

  return toBffError(
    provider,
    is504 ? CANONICAL_STATUS.TIMEOUT : CANONICAL_STATUS.PROVIDER_ERROR,
    is504
      ? "Upstream timeout. Please retry later."
      : "Provider service is temporarily unavailable. Please retry later.",
    { retryable: !is501 }
  );
};
