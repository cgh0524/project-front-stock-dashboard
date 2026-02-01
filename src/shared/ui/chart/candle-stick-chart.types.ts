import type {
  CandlestickSeriesOptions,
  ChartOptions,
  IChartApi,
  ISeriesApi,
  UTCTimestamp,
} from "lightweight-charts";

export type CandleStickData = {
  time: UTCTimestamp;
  open: number;
  high: number;
  low: number;
  close: number;
};

export type CandleStickChartReadyPayload = {
  chart: IChartApi;
  series: ISeriesApi<"Candlestick">;
};

export type CandleStickChartProps = {
  data: CandleStickData[];
  height?: number;
  autoResize?: boolean;
  options?: Partial<ChartOptions>;
  seriesOptions?: Partial<CandlestickSeriesOptions>;
  className?: string;
  onReady?: (payload: CandleStickChartReadyPayload) => void;
};
