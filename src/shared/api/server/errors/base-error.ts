/* eslint-disable @typescript-eslint/no-explicit-any */

export class BaseError extends Error {
  constructor(
    message: string,
    public readonly code: string, // 내부 에러 코드 키 (로그/매핑용)
    public readonly meta?: Record<string, any> // 디버깅용(민감정보 주의)
  ) {
    super(message);
    this.name = new.target.name;
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

export class ValidationError extends BaseError {
  constructor(message = "Invalid request", meta?: Record<string, any>) {
    super(message, "ERR.VALIDATION", meta);
  }
}

export class ServiceError extends BaseError {
  constructor(message = "Service error", meta?: Record<string, any>) {
    super(message, "ERR.SERVICE", meta);
  }
}
