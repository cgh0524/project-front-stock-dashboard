"use client";

import type {
  BarData
} from "lightweight-charts";
import {
  BarSeries,
  type BarSeriesOptions,
  type ChartOptions,
  createChart,
  type IChartApi,
  type ISeriesApi,
} from "lightweight-charts";
import { useEffect, useRef } from "react";

import type { BarChartReadyPayload } from "./bar-chart.types";

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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Bar"> | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  /** 마운트 시 차트/시리즈 생성 (SSR 안전: useEffect 내부에서만 접근) */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chart = createChart(container, {
      height,
      ...(options ?? {}),
    } as ChartOptions);

    const series = chart.addSeries(BarSeries, {
      ...(seriesOptions ?? {}),
    });

    chartRef.current = chart;
    seriesRef.current = series;

    // 최초 데이터 주입 및 화면 맞춤
    series.setData(data);
    chart.timeScale().fitContent();

    onReady?.({ chart, series });

    // 언마운트 시 리소스 정리
    return () => {
      resizeObserverRef.current?.disconnect();
      resizeObserverRef.current = null;
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
    };
  }, []);

  /** 컨테이너 리사이즈 시 차트 크기 동기화 */
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

  /** 데이터 변경 시 시리즈 업데이트 */
  useEffect(() => {
    if (!seriesRef.current) return;
    seriesRef.current.setData(data);
    chartRef.current?.timeScale().fitContent();
  }, [data]);

  /** 옵션 변경 시 차트 설정 반영 */
  useEffect(() => {
    if (!chartRef.current) return;
    chartRef.current.applyOptions({ height, ...(options ?? {}) } as ChartOptions);
  }, [height, options]);

  /** 시리즈 옵션 변경 시 시리즈 설정 반영 */
  useEffect(() => {
    if (!seriesRef.current) return;
    seriesRef.current.applyOptions({ ...(seriesOptions ?? {}) } as BarSeriesOptions);
  }, [seriesOptions]);

  return <div ref={containerRef} className={className} />;
}
