/** API 공급자 관련 설정 */
import "server-only";

export const API_PROVIDER = {
  /** Financial Moeling Prep - 250 Calls / Day */
  FMP: "FMP",
  /** Alphavantage - 25 Calls / Day */
  ALPHAVANTAGE: "ALPHAVANTAGE",
  /** Finnhub - 30 Calls / Seconds & 60 Calls / Minute */
  FINNHUB: "FINNHUB",
  /** 사용하지 않는 공급자 */
  NONE: "NONE",
} as const;

export type ApiProvider = (typeof API_PROVIDER)[keyof typeof API_PROVIDER];

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
