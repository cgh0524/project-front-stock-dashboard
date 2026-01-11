/** 셀렉트 옵션 타입 */
export type Option = {
  label: string;
  value: string;
};

/** 거래소 */
export const MARKET_EXCHANGE = {
  /** NASDAQ: 미국 기술주·성장주 중심 전자거래소 */
  NASDAQ: "NASDAQ",
  /** NYSE: 미국 최대 규모의 전통적 증권거래소 */
  NYSE: "NYSE",
  /** AMEX: 중소형주·ETF 비중이 높은 거래소 (現 NYSE American) */
  AMEX: "AMEX",
} as const;

export type MarketExchange =
  (typeof MARKET_EXCHANGE)[keyof typeof MARKET_EXCHANGE];

/** market leaders tabs */
export const MARKET_LEADERS_TABS = {
  /** 최대 상승주 */
  BIGGEST_GAINERS: "Biggest Gainers",
  /** 최대 하락주 */
  BIGGEST_LOSERS: "Biggest Losers",
  /** 최대 거래량 */
  MOST_ACTIVES: "Most Actives",
} as const;

export type MarketLeadersTab =
  (typeof MARKET_LEADERS_TABS)[keyof typeof MARKET_LEADERS_TABS];
