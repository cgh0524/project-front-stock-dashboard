"use client";

import {
  CandlestickSeries,
  type CandlestickSeriesOptions,
  type ChartOptions,
  ColorType,
  type DeepPartial,
  type IChartApi,
  type ISeriesApi,
  LineStyle,
} from "lightweight-charts";
import { useMemo } from "react";

import type {
  CandleStickChartProps,
  CandleStickChartReadyPayload,
} from "./candle-stick-chart.types";
import { useCandlestickCrosshairMove } from "./use-candlestick-crosshair-move";
import { useLightweightChart } from "./use-lightweight-chart";
import { useVisibleLogicalRangeChange } from "./use-visible-logical-range-change";

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
  onCrosshairMove,
  onVisibleRangeChange,
}: CandleStickChartProps) {
  const mergedOptions = useMemo<DeepPartial<ChartOptions>>(() => {
    return {
      ...DEFAULT_CHART_OPTIONS,
      ...options ?? {},
    };
  }, [options]);

  const { attach: attachCrosshairMove } = useCandlestickCrosshairMove({
    onCrosshairMove,
  });
  const { attach: attachVisibleRangeChange } = useVisibleLogicalRangeChange({
    onVisibleRangeChange,
  });

  const onReady = (payload: CandleStickChartReadyPayload) => {
    attachCrosshairMove(payload.chart, payload.series);
    attachVisibleRangeChange(payload.chart);
  };

  const seriesHandlers: {
    createSeries: (chart: IChartApi, nextOptions?: Partial<CandlestickSeriesOptions>) => ISeriesApi<"Candlestick">;
    setSeriesData: (series: ISeriesApi<"Candlestick">, nextData: CandleStickChartProps["data"]) => void;
    applySeriesOptions: (series: ISeriesApi<"Candlestick">, nextOptions?: Partial<CandlestickSeriesOptions>) => void;
  } = {
    createSeries: (chart, nextOptions) =>
      chart.addSeries(CandlestickSeries, nextOptions),
    setSeriesData: (series, nextData) => series.setData(nextData),
    applySeriesOptions: (series, nextOptions) =>
      series.applyOptions(nextOptions ?? {}),
  };

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
    fitContentOnUpdate: false,
    ...seriesHandlers,
    onReady,
  });

  return <div ref={containerRef} className={className} />;
}
