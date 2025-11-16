/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  NetworkError,
  TimeoutError,
} from "@/shared/api/server/errors/base-error";
import { type BffError } from "@/shared/api/server/errors/bff-error";
import { ProviderError } from "@/shared/api/server/errors/provider-error";
import { type BffSuccess } from "@/shared/api/server/http/success-response";
import {
  API_PROVIDER,
  type ApiProvider,
} from "@/shared/api/server/provider/api-provider";

import { type FetcherOptions, setAuthorization } from "./authorization";
import { backoff, DEFAULT_RETRY, sleep } from "./retry-policy";

export type Result<T> = BffSuccess<T> | BffError;

/** 기본 타임아웃 시간 (10초) */
const DEFAULT_TIMEOUT_MILLIS = 10_000;

/** fetch + timeout */
export async function withTimeout(
  url: string,
  options: FetcherOptions
): Promise<Response> {
  const timeoutMs = options.timeoutMillis ?? DEFAULT_TIMEOUT_MILLIS;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(id);
  }
}

/** fetch + timeout + retry */
export async function withRetry(
  url: string,
  options: FetcherOptions = {}
): Promise<Response> {
  const retry = options.retry ?? DEFAULT_RETRY;
  const method = String(options.method || "GET").toUpperCase();

  let attempt = 0;
  let lastError: unknown;

  while (attempt <= retry.retries) {
    try {
      const res = await withTimeout(url, options);
      // 재시도 대상 판단
      if (!retry.retryOn({ status: res.status, method })) return res;

      // 재시도 하더라도 한 번 더 시도 가능하면 백오프 후 루프
      attempt++;
      if (attempt > retry.retries) return res;
      await sleep(backoff(attempt, retry));
      continue;
    } catch (err) {
      lastError = err;
      // AbortError는 여기서는 "오류"로 보고 retryOn에게 넘김
      const canRetry = retry.retryOn({ error: err, method });
      attempt++;

      if (!canRetry || attempt > retry.retries) throw err;
      await sleep(backoff(attempt, retry));
    }
  }

  // 정상적으로는 도달하지 않음
  throw lastError ?? new Error("fetcher exhausted without response");
}

export const fetcher = async <T>(
  url: string,
  options: FetcherOptions = {}
): Promise<T> => {
  const provider: ApiProvider = options.provider ?? API_PROVIDER.NONE;

  const { url: authorizedUrl, options: authorizedOptions } = setAuthorization({
    url,
    options,
    provider,
  });

  try {
    const res = await withRetry(authorizedUrl, authorizedOptions);
    const text = await res.text();

    if (!res.ok) {
      // 공급자 에러 로깅
      console.error("[UPSTREAM ERROR]", {
        provider,
        url: authorizedUrl,
        status: res.status,
        body: text.slice(0, 300), // full body logging 금지
      });

      throw new ProviderError(res.status, text, { provider, url });
    }
    return JSON.parse(text);
  } catch (e: any) {
    // BFF, fetcher 에러 로깅
    console.error("[UPSTREAM FAIL]", {
      provider,
      url: authorizedUrl,
      error: e.message,
      type: e.name,
    });

    // withTimeout에서 AbortError가 발생한 경우
    if (e.name === "AbortError")
      throw new TimeoutError("Fetch aborted by timeout", { provider, url });

    // fetch는 네트워크 실패 시 TypeError를 던짐
    if (e instanceof TypeError)
      throw new NetworkError(e.message, { provider, url });

    // ProviderError 등은 그대로 전파
    throw e;
  }
};
