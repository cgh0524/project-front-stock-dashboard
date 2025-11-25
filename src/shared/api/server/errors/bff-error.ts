import type { ApiProvider } from "@/shared/api/server/provider/provider.config";

import type { CanonicalStatus } from "./error-codes";
import { toHttpCode } from "./error-codes";

export type BffError = {
  /** 성공여부 */
  ok: false;
  /** API 공급자 식별 ex) FMP(Financial Moeling Prep), Alphavantage, etc. */
  provider: ApiProvider;
  /** 요청 ID */
  requestId: string;
  /** HTTP code */
  code: number;
  /** 정규화된 HTTP 상태 */
  status: CanonicalStatus;
  /** 사용자/디버깅용 기본 메시지 */
  message: string;
  /** 클라이언트 재시도 가능 여부 */
  retryable?: boolean;
  /** 응답 직렬화 시각 */
  timestamp: string;
};

export const toBffError = (
  provider: ApiProvider,
  status: CanonicalStatus,
  msg: string,
  opt?: {
    retryable?: boolean;
    requestId?: string;
  }
): BffError => ({
  ok: false,
  provider,
  requestId: opt?.requestId ?? crypto.randomUUID(),
  code: toHttpCode(status),
  status: status,
  message: msg,
  retryable: opt?.retryable,
  timestamp: new Date().toISOString(),
});
