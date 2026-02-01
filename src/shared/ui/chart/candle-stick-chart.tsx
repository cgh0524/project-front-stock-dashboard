"use client";

import {
  CandlestickSeries,
  type CandlestickSeriesOptions,
  type ChartOptions,
  ColorType,
  createChart,
  type DeepPartial,
  type IChartApi,
  type ISeriesApi,
  LineStyle,
} from "lightweight-charts";
import { useEffect, useRef } from "react";

import type { CandleStickChartProps } from "./candle-stick-chart.types";

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
  const { ...safeOptions } = options ?? {};
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chart = createChart(container, {
      ...DEFAULT_CHART_OPTIONS,
      ...safeOptions,
      height,
    } as ChartOptions);

    const series = chart.addSeries(CandlestickSeries, {
      ...(seriesOptions ?? {}),
    } as CandlestickSeriesOptions);

    chartRef.current = chart;
    seriesRef.current = series;

    series.setData(data);
    chart.timeScale().fitContent();

    onReady?.({ chart, series });

    return () => {
      resizeObserverRef.current?.disconnect();
      resizeObserverRef.current = null;
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!autoResize) {
      resizeObserverRef.current?.disconnect();
      resizeObserverRef.current = null;
      return;
    }

    const container = containerRef.current;
    const chart = chartRef.current;
    if (!container || !chart) return;

    resizeObserverRef.current = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height: nextHeight } = entry.contentRect;
      chart.applyOptions({ width, height: nextHeight } as ChartOptions);
      chart.timeScale().fitContent();
    });
    resizeObserverRef.current.observe(container);

    return () => {
      resizeObserverRef.current?.disconnect();
      resizeObserverRef.current = null;
    };
  }, [autoResize]);

  useEffect(() => {
    if (!seriesRef.current) return;
    seriesRef.current.setData(data);
    chartRef.current?.timeScale().fitContent();
  }, [data]);

  useEffect(() => {
    if (!chartRef.current) return;
    chartRef.current.applyOptions({
      ...DEFAULT_CHART_OPTIONS,
      ...safeOptions,
      height,
    } as ChartOptions);
  }, [height, safeOptions]);

  useEffect(() => {
    if (!seriesRef.current) return;
    seriesRef.current.applyOptions({ ...(seriesOptions ?? {}) } as CandlestickSeriesOptions);
  }, [seriesOptions]);

  return <div ref={containerRef} className={className} />;
}
