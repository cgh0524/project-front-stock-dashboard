/** API 공급자 관련 상수 */
export const API_PROVIDER = {
  /** Financial Modeling Prep - 250 Calls / Day */
  FMP: "FMP",
  /** Alphavantage - 25 Calls / Day */
  ALPHAVANTAGE: "ALPHAVANTAGE",
  /** Finnhub - 30 Calls / Seconds & 60 Calls / Minute */
  FINNHUB: "FINNHUB",
  /** 사용하지 않는 공급자 */
  NONE: "NONE",
} as const;

export type ApiProvider = (typeof API_PROVIDER)[keyof typeof API_PROVIDER];
