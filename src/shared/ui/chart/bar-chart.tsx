"use client";

import type { BarData, BarSeriesOptions, ChartOptions, ISeriesApi } from "lightweight-charts";
import {
  BarSeries,
} from "lightweight-charts";

import type { BarChartReadyPayload } from "./bar-chart.types";
import { useLightweightChart } from "./use-lightweight-chart";

export type BarChartProps = {
  data: BarData[];
  height?: number;
  autoResize?: boolean;
  options?: Partial<ChartOptions>;
  seriesOptions?: Partial<BarSeriesOptions>;
  className?: string;
  onReady?: (payload: BarChartReadyPayload) => void;
};

const DEFAULT_HEIGHT = 320;

export function BarChart({
  data,
  height = DEFAULT_HEIGHT,
  autoResize = true,
  options,
  seriesOptions,
  className,
  onReady,
}: BarChartProps) {
  const { containerRef } = useLightweightChart<
    ISeriesApi<"Bar">,
    BarData,
    BarSeriesOptions
  >({
    data,
    height,
    autoResize,
    options,
    seriesOptions,
    createSeries: (chart, nextOptions) =>
      chart.addSeries(BarSeries, { ...(nextOptions ?? {}) }),
    setSeriesData: (series, nextData) => series.setData(nextData),
    applySeriesOptions: (series, nextOptions) =>
      series.applyOptions({ ...(nextOptions ?? {}) } as BarSeriesOptions),
    onReady,
  });

  return <div ref={containerRef} className={className} />;
}
