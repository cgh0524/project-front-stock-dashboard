export const CHART_INTERVAL = {
  ONE_MINUTE: "1m",
  FIVE_MINUTES: "5m",
  FIFTEEN_MINUTES: "15m",
  ONE_HOUR: "60m",
  ONE_DAY: "1d",
  ONE_WEEK: "1wk",
  ONE_MONTH: "1mo",
} as const;

export type ChartInterval = (typeof CHART_INTERVAL)[keyof typeof CHART_INTERVAL];

export type ChartQuery = {
  /** 시작일 - ex) 2024-01-01 */
  fromDate: string;
  /** 종료일 - ex) 2024-12-31 */
  toDate?: string;
  /** 간격 */
  interval?: ChartInterval;
  /** 프리/애프터 포함 여부 */
  includePrePost?: boolean;
};


export type ChartMeta = {
  symbol: string;
  currency: string;
  exchangeName: string;
  instrumentType: string;
  timezone: string;
  regularMarketPrice: number;
  regularMarketTime: string;
  gmtoffset: number;
};

export type OHLCV = {
  time: string;
  open: number | null;
  high: number | null;
  low: number | null;
  close: number | null;
  volume: number | null;
  adjclose?: number | null;
};

export type ChartResult = {
  meta: ChartMeta | null;
  data: OHLCV[];
};
