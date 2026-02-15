export const CHART_INTERVAL = {
  ONE_HOUR: "60m",
  ONE_DAY: "1d",
  ONE_WEEK: "1wk",
  ONE_MONTH: "1mo",
} as const;

export type ChartInterval = (typeof CHART_INTERVAL)[keyof typeof CHART_INTERVAL];

/** 일봉 이상 기본 조회 기간(일) */
export const CHART_DEFAULT_RANGE_DAYS = 365;
/** 분/시간봉 기본 조회 기간(일) */
export const CHART_DEFAULT_INTRADAY_RANGE_DAYS = 30;
/** 기본 interval */
export const CHART_DEFAULT_INTERVAL = CHART_INTERVAL.ONE_DAY;
/** 분/시간봉 interval 목록 */
export const CHART_INTRADAY_INTERVALS: ChartInterval[] = [
  CHART_INTERVAL.ONE_HOUR,
];
/** interval 라벨 맵 */
export const CHART_INTERVAL_LABELS: Record<ChartInterval, string> = {
  [CHART_INTERVAL.ONE_HOUR]: "1h",
  [CHART_INTERVAL.ONE_DAY]: "1d",
  [CHART_INTERVAL.ONE_WEEK]: "1w",
  [CHART_INTERVAL.ONE_MONTH]: "1M",
};
/** interval switch 기본 목록 */
export const CHART_DEFAULT_INTERVAL_OPTIONS: ChartInterval[] = [
  CHART_INTERVAL.ONE_HOUR,
  CHART_INTERVAL.ONE_DAY,
  CHART_INTERVAL.ONE_WEEK,
  CHART_INTERVAL.ONE_MONTH,
];
/** 볼륨 막대 색상 */
export const CHART_VOLUME_COLORS = {
  up: "#10b981",
  down: "#ef4444",
  neutral: "#6b7280",
} as const;

export type ChartVolumeColors = {
  up: string;
  down: string;
  neutral: string;
};

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
