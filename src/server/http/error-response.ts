/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

import { type ApiError, toApiError } from "@/server/errors/api-error";
import {
  BaseError,
  NetworkError,
  TimeoutError,
} from "@/server/errors/base-error";
import { CANONICAL_STATUS } from "@/server/errors/error-codes";
import {
  ProviderError,
  toApiProviderError,
} from "@/server/errors/provider-error";
import {
  API_PROVIDER,
  type ApiProvider,
} from "@/server/provider/provider.config";

import {
  toApiValidationError,
  ValidationError,
} from "../errors/validation-error";
import { logError } from "../logging/error";

/** error 유형에 따라 API 에러 정규화 */
export function normalizeError(
  err: any,
  provider: ApiProvider = API_PROVIDER.NONE
): ApiError {
  logError("[API_ERROR]", {
    name: err.name,
    message: err.message,
    provider,
    meta: err.meta,
    source: err.source ?? err.meta?.source,
    stack: err.stack,
  });

  if (err instanceof ProviderError) {
    return toApiProviderError(provider, err);
  }

  if (err instanceof ValidationError) {
    return toApiValidationError(err, provider);
  }

  if (err instanceof TimeoutError) {
    return toApiError(provider, CANONICAL_STATUS.TIMEOUT, err.message, {
      retryable: true,
    });
  }

  if (err instanceof NetworkError) {
    return toApiError(provider, CANONICAL_STATUS.NETWORK_ERROR, err.message, {
      retryable: true,
    });
  }

  if (err instanceof BaseError) {
    return toApiError(provider, CANONICAL_STATUS.INTERNAL_ERROR, err.message, {
      retryable: false,
    });
  }

  return toApiError(
    provider,
    CANONICAL_STATUS.INTERNAL_ERROR,
    err?.message ?? "Unknown error",
    { retryable: false }
  );
}

/** error 유형에 따라 NextResponse 반환 */
export function fail(apiError: ApiError) {
  return NextResponse.json(apiError, { status: apiError.code });
}
