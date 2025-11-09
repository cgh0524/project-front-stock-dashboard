/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

import {
  BaseError,
  NetworkError,
  TimeoutError,
} from "@/shared/api/server/errors/base-error";
import { toBffError } from "@/shared/api/server/errors/bff-error";
import { CANONICAL_STATUS } from "@/shared/api/server/errors/error-codes";
import {
  normalizeProviderError,
  ProviderError,
} from "@/shared/api/server/errors/provider-error";
import {
  API_PROVIDER,
  type ApiProvider,
} from "@/shared/api/server/provider/api-provider";

/** error 유형에 따라 NextResponse 반환 */
export function fail(err: any, provider: ApiProvider = API_PROVIDER.NONE) {
  if (err instanceof ProviderError) {
    const apiError = normalizeProviderError(provider, err);
    return NextResponse.json(apiError, { status: apiError.code });
  }

  if (err instanceof TimeoutError) {
    const apiError = toBffError(
      provider,
      CANONICAL_STATUS.TIMEOUT,
      err.message,
      { retryable: true }
    );
    return NextResponse.json(apiError, { status: apiError.code });
  }

  if (err instanceof NetworkError) {
    const apiError = toBffError(
      provider,
      CANONICAL_STATUS.NETWORK_ERROR,
      err.message,
      { retryable: true }
    );
    return NextResponse.json(apiError, { status: apiError.code });
  }

  if (err instanceof BaseError) {
    const apiError = toBffError(
      provider,
      CANONICAL_STATUS.INTERNAL_ERROR,
      err.message,
      { retryable: false }
    );
    return NextResponse.json(apiError, { status: apiError.code });
  }

  const apiError = toBffError(
    provider,
    CANONICAL_STATUS.INTERNAL_ERROR,
    err?.message ?? "Unknown error",
    { retryable: false }
  );
  return NextResponse.json(apiError, { status: apiError.code });
}
