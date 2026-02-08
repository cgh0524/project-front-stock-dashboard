import type {
  CandlestickSeriesOptions,
  ChartOptions,
  IChartApi,
  ISeriesApi,
  LogicalRange,
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

export type CandleStickCrosshairPayload = {
  point: { x: number; y: number } | null;
  data: CandleStickData | null;
};

export type CandleStickChartProps = {
  data: CandleStickData[];
  height?: number;
  autoResize?: boolean;
  options?: Partial<ChartOptions>;
  seriesOptions?: Partial<CandlestickSeriesOptions>;
  className?: string;
  onCrosshairMove?: (payload: CandleStickCrosshairPayload) => void;
  onVisibleRangeChange?: (range: LogicalRange | null) => void;
};
