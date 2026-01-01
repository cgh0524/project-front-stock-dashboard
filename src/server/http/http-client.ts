/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ApiError } from "@/server/errors/api-error";
import { NetworkError, TimeoutError } from "@/server/errors/base-error";
import { ProviderError } from "@/server/errors/provider-error";
import {
  API_PROVIDER,
  type ApiProvider,
} from "@/server/provider/provider.config";
import { type ApiSuccess } from "@/shared/api/api-success";

import { type FetcherOptions, setAuthorization } from "./authorization";
import { backoff, DEFAULT_RETRY, sleep } from "./retry-policy";

export type Result<T> = ApiSuccess<T> | ApiError;

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
        body: text.slice(0, 300),
      });

      throw new ProviderError(res.status, text, { provider, url });
    }
    return JSON.parse(text);
  } catch (error: any) {
    // BFF, fetcher 에러 로깅
    console.error("[UPSTREAM FAIL]", {
      provider,
      url: authorizedUrl,
      error: error.message,
      type: error.name,
    });

    // withTimeout에서 AbortError가 발생한 경우
    if (error.name === "AbortError")
      throw new TimeoutError("Fetch aborted by timeout", { provider, url });

    // fetch는 네트워크 실패 시 TypeError를 던짐
    if (error instanceof TypeError)
      throw new NetworkError(error.message, { provider, url });

    // ProviderError 등은 그대로 전파
    throw error;
  }
};
