/** API 공급자 관련 설정 */
import "server-only";

import type { ApiProvider } from "@/shared/api/provider";
import { API_PROVIDER } from "@/shared/api/provider";

export { API_PROVIDER };
export type { ApiProvider };

/**
 * API 공급자 설정 객체
 *
 * @key API_PROVIDER
 * @value { baseUrl: string; apiKey: string; }
 */
export const API_PROVIDER_CONFIG = {
  FMP: {
    baseUrl: process.env.FINANCIAL_MODELING_PREP_API_BASE_URL!,
    apiKey: process.env.FINANCIAL_MODELING_PREP_API_KEY!,
  },
  ALPHAVANTAGE: {
    baseUrl: process.env.ALPHAVANTAGE_API_BASE_URL!,
    apiKey: process.env.ALPHAVANTAGE_API_KEY!,
  },
  FINNHUB: {
    baseUrl: process.env.FINNHUB_API_BASE_URL!,
    apiKey: process.env.FINNHUB_API_KEY!,
  },
  YAHOO: {
    baseUrl: "",
    apiKey: "",
  },
  NONE: {
    baseUrl: "",
    apiKey: "",
  },
} as const;

export type ApiProviderConfig =
  (typeof API_PROVIDER_CONFIG)[keyof typeof API_PROVIDER_CONFIG];

export const getApiProviderConfig = (provider: ApiProvider) => {
  return API_PROVIDER_CONFIG[provider];
};
