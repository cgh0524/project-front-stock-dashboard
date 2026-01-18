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

/**
 * market leaders option key
 */
export const MARKET_LEADERS_OPTION_KEY = {
  /** 최대 상승주 */
  BIGGEST_GAINERS: "BIGGEST_GAINERS",
  /** 최대 하락주 */
  BIGGEST_LOSERS: "BIGGEST_LOSERS",
  /** 최대 거래량 */
  MOST_ACTIVES: "MOST_ACTIVES",
} as const;

export type MarketLeadersOptionKey =
  (typeof MARKET_LEADERS_OPTION_KEY)[keyof typeof MARKET_LEADERS_OPTION_KEY];

/** market leaders theme label */
export const MARKET_LEADERS_OPTION_LABEL = {
  [MARKET_LEADERS_OPTION_KEY.BIGGEST_GAINERS]: "Biggest Gainers",
  [MARKET_LEADERS_OPTION_KEY.BIGGEST_LOSERS]: "Biggest Losers",
  [MARKET_LEADERS_OPTION_KEY.MOST_ACTIVES]: "Most Actives",
} as const;

export type MarketLeadersOptionLabel =
  (typeof MARKET_LEADERS_OPTION_LABEL)[keyof typeof MARKET_LEADERS_OPTION_LABEL];
