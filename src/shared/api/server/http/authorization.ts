import type { RetryPolicy } from "@/shared/api/server/http/retry-policy";
import {
  API_PROVIDER,
  type ApiProvider,
  type ApiProviderConfig,
  getApiProviderConfig,
} from "@/shared/api/server/provider/api-provider";

/** fetcher에서 사용하는 옵션 확장 */
export type FetcherOptions = RequestInit & {
  provider?: ApiProvider;
  timeoutMillis?: number;
  retry?: RetryPolicy;
};

/** 인증 처리에 필요한 정보 모음 */
type AuthorizationContext = {
  url: string;
  options: FetcherOptions;
  provider: ApiProvider;
  config: ApiProviderConfig;
};

/** 인증 처리가 끝난 결과 */
type AuthorizationResult = {
  url: string;
  options: FetcherOptions;
};

/** 공급자별 인증 처리기 시그니처 */
type AuthorizationHandler = (
  context: AuthorizationContext
) => AuthorizationResult;

/** 별도 인증이 필요 없는 경우 passthrough */
const passthroughAuthorization: AuthorizationHandler = ({ url, options }) => ({
  url,
  options,
});

/** 헤더 기반 인증 (예: Finnhub) */
const authorizeWithHeader =
  (headerName: string): AuthorizationHandler =>
  ({ url, options, config }) => {
    const headers = new Headers(options.headers ?? {});
    headers.set(headerName, config.apiKey);

    return {
      url,
      options: {
        ...options,
        headers,
      },
    };
  };

/** 쿼리 파라미터로 API 키 추가 */
const appendSearchParam = (url: string, key: string, value: string): string => {
  try {
    const parsed = new URL(url);
    parsed.searchParams.set(key, value);
    return parsed.toString();
  } catch {
    const [base, query = ""] = url.split("?");
    const searchParams = new URLSearchParams(query);
    searchParams.set(key, value);
    const queryString = searchParams.toString();
    return queryString ? `${base}?${queryString}` : base;
  }
};

/** 쿼리 파라미터 기반 인증 */
const authorizeWithQuery =
  (paramName: string): AuthorizationHandler =>
  ({ url, options, config }) => ({
    url: appendSearchParam(url, paramName, config.apiKey),
    options: {
      ...options,
    },
  });

/** 공급자별 인증 전략 매핑 */
const AUTHORIZATION_HANDLERS: Record<ApiProvider, AuthorizationHandler> = {
  [API_PROVIDER.NONE]: passthroughAuthorization,
  [API_PROVIDER.FINNHUB]: authorizeWithHeader("X-Finnhub-Token"),
  [API_PROVIDER.ALPHAVANTAGE]: authorizeWithQuery("apikey"),
  [API_PROVIDER.FMP]: authorizeWithQuery("apikey"),
};

/** 공급자 설정에 따라 인증 부여 */
export function setAuthorization({
  url,
  options,
  provider,
}: {
  url: string;
  options: FetcherOptions;
  provider: ApiProvider;
}): AuthorizationResult {
  if (provider === API_PROVIDER.NONE) {
    return { url, options };
  }

  const config = getApiProviderConfig(provider);
  const handler = AUTHORIZATION_HANDLERS[provider] ?? passthroughAuthorization;

  return handler({
    url,
    options,
    provider,
    config,
  });
}
