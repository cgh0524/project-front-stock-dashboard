"use client";

import { type ChartOptions, createChart, type DeepPartial, type IChartApi } from "lightweight-charts";
import { useEffect, useRef } from "react";

export type UseLightweightChartParams<TSeries, TData, TSeriesOptions> = {
  data: TData[];
  height: number;
  autoResize: boolean;
  options?: DeepPartial<ChartOptions>;
  seriesOptions?: Partial<TSeriesOptions>;
  createSeries: (chart: IChartApi, options?: Partial<TSeriesOptions>) => TSeries;
  setSeriesData: (series: TSeries, data: TData[]) => void;
  applySeriesOptions?: (series: TSeries, options?: Partial<TSeriesOptions>) => void;
  onReady?: (payload: { chart: IChartApi; series: TSeries }) => void;
  /** 데이터 업데이트 시 fitContent 호출 여부 (기본값: true) */
  fitContentOnUpdate?: boolean;
};

export function useLightweightChart<TSeries, TData, TSeriesOptions>({
  data,
  height,
  autoResize,
  options,
  seriesOptions,
  createSeries,
  setSeriesData,
  applySeriesOptions,
  onReady,
  fitContentOnUpdate = true,
}: UseLightweightChartParams<TSeries, TData, TSeriesOptions>) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<TSeries | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  /** 마운트 시 차트/시리즈 생성 (SSR 안전: useEffect 내부에서만 접근) */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chart = createChart(container, {
      ...(options ?? {}),
      height,
    } as ChartOptions);

    const series = createSeries(chart, seriesOptions);

    chartRef.current = chart;
    seriesRef.current = series;

    setSeriesData(series, data);
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
    // 마운트/언마운트 시에만 실행
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setSeriesData(seriesRef.current, data);
    if (fitContentOnUpdate) {
      chartRef.current?.timeScale().fitContent();
    }
  }, [data, fitContentOnUpdate, setSeriesData]);

  /** 옵션 변경 시 차트 설정 반영 */
  useEffect(() => {
    if (!chartRef.current) return;
    chartRef.current.applyOptions({
      ...(options ?? {}),
      height,
    } as ChartOptions);
  }, [height, options]);

  /** 시리즈 옵션 변경 시 시리즈 설정 반영 */
  useEffect(() => {
    if (!seriesRef.current || !applySeriesOptions) return;
    applySeriesOptions(seriesRef.current, seriesOptions);
  }, [applySeriesOptions, seriesOptions]);

  return { containerRef };
}
