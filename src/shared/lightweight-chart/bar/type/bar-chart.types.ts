import type {
  IChartApi,
  ISeriesApi,
  UTCTimestamp,
} from "lightweight-charts";

export type BarData = {
  time: UTCTimestamp;
  open: number;
  high: number;
  low: number;
  close: number;
};

export type BarChartReadyPayload = {
  chart: IChartApi;
  series: ISeriesApi<"Bar">;
};


