/* eslint-disable @typescript-eslint/no-explicit-any */

export const ERROR_SOURCE = {
  CLIENT: "CLIENT",
  UPSTREAM: "UPSTREAM",
  DOMAIN: "DOMAIN",
} as const;

export type ErrorSource = (typeof ERROR_SOURCE)[keyof typeof ERROR_SOURCE];

export class BaseError extends Error {
  readonly source?: ErrorSource;

  constructor(
    message: string,
    public readonly code: string, // 내부 에러 코드 키 (로그/매핑용)
    public readonly meta?: Record<string, any> & { source?: ErrorSource } // 디버깅용(민감정보 주의)
  ) {
    super(`[${code}]: ${message}`);
    this.meta = {
      source: meta?.source,
      ...meta,
    };
  }
}

export class NetworkError extends BaseError {
  constructor(message = "Network error", meta?: Record<string, any>) {
    super(message, "ERR.NETWORK", meta);
  }
}

export class TimeoutError extends BaseError {
  constructor(message = "Request timeout", meta?: Record<string, any>) {
    super(message, "ERR.NETWORK.TIMEOUT", meta);
  }
}

export class ServiceError extends BaseError {
  constructor(message = "Service error", meta?: Record<string, any>) {
    super(message, "ERR.SERVICE", meta);
  }
}
