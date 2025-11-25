import type { ApiProvider } from "../provider/provider.config";
import type { ErrorSource } from "./base-error";
import { BaseError, ERROR_SOURCE } from "./base-error";
import type { BffError } from "./bff-error";
import { toBffError } from "./bff-error";
import type { CanonicalStatus } from "./error-codes";
import { CANONICAL_STATUS } from "./error-codes";

/**
 * 응답 데이터, Request Payload 등의 스키마 검증 실패 오류
 * @meta { source: ErrorSource } 에러 소스 정보 포함
 * 클라이언트 에러(Bad Request)인지, 서버 에러(응답 데이터 Zod Schema Validation)인지 구분 필요
 */
export class ValidationError extends BaseError {
  constructor(
    message = "Invalid request",
    meta?: Record<string, unknown> & { source: ErrorSource }
  ) {
    super(message, "ERR.VALIDATION", meta);
  }
}

export function toBffValidationError(
  err: ValidationError,
  provider: ApiProvider
): BffError {
  let status: CanonicalStatus;

  switch (err.meta?.source) {
    case ERROR_SOURCE.CLIENT:
    case ERROR_SOURCE.DOMAIN:
      status = CANONICAL_STATUS.INVALID_REQUEST;
      break;

    case ERROR_SOURCE.UPSTREAM:
      status = CANONICAL_STATUS.INTERNAL_ERROR;
      break;

    default:
      status = CANONICAL_STATUS.INTERNAL_ERROR;
  }

  return toBffError(provider, status, err.message, {
    retryable: false,
  });
}
