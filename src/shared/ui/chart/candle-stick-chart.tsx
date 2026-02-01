"use client";

import {
  CandlestickSeries,
  type CandlestickSeriesOptions,
  type ChartOptions,
  ColorType,
  type DeepPartial,
  type ISeriesApi,
  LineStyle,
} from "lightweight-charts";
import { useMemo } from "react";

import type { CandleStickChartProps } from "./candle-stick-chart.types";
import { useLightweightChart } from "./use-lightweight-chart";

const DEFAULT_HEIGHT = 320;
const DEFAULT_CHART_OPTIONS: DeepPartial<ChartOptions> = {
  layout: {
    background: { type: ColorType.Solid, color: "#000000" },
    textColor: "#e5e7eb",
  },
  grid: {
    vertLines: { color: "rgba(255, 255, 255, 0.06)", style: LineStyle.Solid, visible: true },
    horzLines: { color: "rgba(255, 255, 255, 0.06)", style: LineStyle.Solid, visible: true },
  },
};

export function CandleStickChart({
  data,
  height = DEFAULT_HEIGHT,
  autoResize = true,
  options,
  seriesOptions,
  className,
  onReady,
}: CandleStickChartProps) {
  const mergedOptions = useMemo<DeepPartial<ChartOptions>>(() => {
    return {
      ...DEFAULT_CHART_OPTIONS,
      ...options ?? {},
    };
  }, [options]);

  const { containerRef } = useLightweightChart<
    ISeriesApi<"Candlestick">,
    CandleStickChartProps["data"][number],
    CandlestickSeriesOptions
  >({
    data,
    height,
    autoResize,
    options: mergedOptions,
    seriesOptions,
    createSeries: (chart, nextOptions) =>
      chart.addSeries(CandlestickSeries, { ...(nextOptions ?? {}) } as CandlestickSeriesOptions),
    setSeriesData: (series, nextData) => series.setData(nextData),
    applySeriesOptions: (series, nextOptions) =>
      series.applyOptions({ ...(nextOptions ?? {}) } as CandlestickSeriesOptions),
    onReady,
  });

  return <div ref={containerRef} className={className} />;
}
