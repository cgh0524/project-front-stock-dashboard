import type {
  CandlestickSeriesOptions,
  ChartOptions,
  HistogramSeriesOptions,
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

export type VolumeData = {
  time: UTCTimestamp;
  value: number;
  color?: string;
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
  volume?: VolumeData[];
  height?: number;
  autoResize?: boolean;
  options?: Partial<ChartOptions>;
  seriesOptions?: Partial<CandlestickSeriesOptions>;
  volumeSeriesOptions?: Partial<HistogramSeriesOptions>;
  className?: string;
  onCrosshairMove?: (payload: CandleStickCrosshairPayload) => void;
  onVisibleRangeChange?: (range: LogicalRange | null) => void;
};
