/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

import {
  BaseError,
  NetworkError,
  TimeoutError,
} from "@/server/errors/base-error";
import { toBffError } from "@/server/errors/bff-error";
import { CANONICAL_STATUS } from "@/server/errors/error-codes";
import {
  ProviderError,
  toBffProviderError,
} from "@/server/errors/provider-error";
import {
  API_PROVIDER,
  type ApiProvider,
} from "@/server/provider/provider.config";

import {
  toBffValidationError,
  ValidationError,
} from "../errors/validation-error";
import { logError } from "../logging/error";

/** error 유형에 따라 NextResponse 반환 */
export function fail(err: any, provider: ApiProvider = API_PROVIDER.NONE) {
  logError("[BFF_ERROR]", {
    name: err.name,
    message: err.message,
    provider,
    meta: err.meta,
    source: err.source ?? err.meta?.source,
    stack: err.stack,
  });

  if (err instanceof ProviderError) {
    const apiError = toBffProviderError(provider, err);
    return NextResponse.json(apiError, { status: apiError.code });
  }

  if (err instanceof ValidationError) {
    const validationError = toBffValidationError(err, provider);
    return NextResponse.json(validationError, { status: validationError.code });
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
