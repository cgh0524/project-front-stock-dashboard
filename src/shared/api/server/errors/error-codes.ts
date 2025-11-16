export const CANONICAL_STATUS = {
  /** 요청 속도 제한 초과 */
  RATE_LIMITED: "RATE_LIMITED",
  /** 잘못된 요청 */
  INVALID_REQUEST: "INVALID_REQUEST",
  /** 인증 실패 */
  UNAUTHORIZED: "UNAUTHORIZED",
  /** 권한 없음 */
  FORBIDDEN: "FORBIDDEN",
  /** 찾을 수 없음 */
  NOT_FOUND: "NOT_FOUND",
  /** 요청 시간 초과 */
  TIMEOUT: "TIMEOUT",
  /** 네트워크 오류 */
  NETWORK_ERROR: "NETWORK_ERROR",
  /** 공급자 오류 */
  PROVIDER_ERROR: "PROVIDER_ERROR",
  /** 잘못된 응답 */
  BAD_RESPONSE: "BAD_RESPONSE",
  /** 스키마 검증 실패 */
  SCHEMA_VALIDATION_FAILED: "SCHEMA_VALIDATION_FAILED",
  /** 내부 오류 */
  INTERNAL_ERROR: "INTERNAL_ERROR",
} as const;

export type CanonicalStatus =
  (typeof CANONICAL_STATUS)[keyof typeof CANONICAL_STATUS];

export function toCanonicalStatus(status: number): CanonicalStatus {
  switch (status) {
    case 400:
      return CANONICAL_STATUS.INVALID_REQUEST;
    case 401:
      return CANONICAL_STATUS.UNAUTHORIZED;
    case 403:
      return CANONICAL_STATUS.FORBIDDEN;
    case 404:
      return CANONICAL_STATUS.NOT_FOUND;
    case 408:
      return CANONICAL_STATUS.TIMEOUT; // client-side idle
    case 429:
      return CANONICAL_STATUS.RATE_LIMITED;
    case 500:
      return CANONICAL_STATUS.INTERNAL_ERROR;
    case 502:
    case 503:
      return CANONICAL_STATUS.PROVIDER_ERROR;
    case 504:
      return CANONICAL_STATUS.TIMEOUT; // upstream timeout
    default:
      if (status >= 500) return CANONICAL_STATUS.PROVIDER_ERROR;
      return CANONICAL_STATUS.INTERNAL_ERROR;
  }
}

export function toHttpCode(status: string): number {
  switch (status) {
    case CANONICAL_STATUS.SCHEMA_VALIDATION_FAILED:
      return 422;
    case CANONICAL_STATUS.BAD_RESPONSE:
    case CANONICAL_STATUS.INVALID_REQUEST:
      return 400;
    case CANONICAL_STATUS.UNAUTHORIZED:
      return 401;
    case CANONICAL_STATUS.FORBIDDEN:
      return 403;
    case CANONICAL_STATUS.NOT_FOUND:
      return 404;
    case CANONICAL_STATUS.TIMEOUT:
      return 504;
    case CANONICAL_STATUS.RATE_LIMITED:
      return 429;
    case CANONICAL_STATUS.NETWORK_ERROR:
    case CANONICAL_STATUS.PROVIDER_ERROR:
      return 502;
    case CANONICAL_STATUS.INTERNAL_ERROR:
    default:
      return 500;
  }
}
