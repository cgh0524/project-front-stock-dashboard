export const JITTER_METHOD = {
  NONE: "none",
  FULL: "full",
} as const;

export type JitterMethod = (typeof JITTER_METHOD)[keyof typeof JITTER_METHOD];

export type RetryPolicy = {
  /** 추가 재시도 횟수 (총 시도 = retries+1) */
  retries: number;
  /** 첫 백오프 */
  baseDelayMs: number;
  /** 백오프 상한 */
  maxDelayMs: number;
  /** 지터 방식 */
  jitter?: JitterMethod;
  /** 재시도 여부 결정 훅 (상태코드/오류/메서드 기반) */
  retryOn: (ctx: {
    status?: number;
    error?: unknown;
    method?: string;
  }) => boolean;
};

export const DEFAULT_RETRY: RetryPolicy = {
  retries: 2,
  baseDelayMs: 300,
  maxDelayMs: 2_000,
  jitter: JITTER_METHOD.FULL,
  retryOn: ({ status, error, method }) => {
    // 안전하지 않은 메서드(POST/PUT/PATCH/DELETE)는 기본적으로 재시도 안 함
    const unsafe = ["POST", "PUT", "PATCH", "DELETE"];
    if (unsafe.includes(String(method || "GET").toUpperCase())) return false;

    // 상태코드 기반(429/5xx) 또는 네트워크 오류만 재시도
    if (typeof status === "number") {
      if (status === 429) return true;
      if (status >= 500 && status <= 599) return true;
      return false;
    }
    // fetch throw (네트워크/Abort 등)
    return !!error;
  },
};

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
export const backoff = (attempt: number, p: RetryPolicy) => {
  const raw = Math.min(p.baseDelayMs * 2 ** (attempt - 1), p.maxDelayMs);

  // full jitter 방식
  if (p.jitter === "full") return Math.random() * raw;
  return raw;
};
