import type { ChartInterval } from "../types";
import { CHART_INTERVAL } from "../types";

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
