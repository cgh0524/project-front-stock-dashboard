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

  /** 차트 초기화 */
  const initChart = () => {
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
  };

  /** 차트 정리 */
  const cleanupChart = () => {
    chartRef.current?.remove();
    chartRef.current = null;
    seriesRef.current = null;
  };

  /** 리사이즈 옵저버 설정 */
  const setupResizeObserver = () => {
    if (!autoResize) return;

    const container = containerRef.current;
    const chart = chartRef.current;
    if (!container || !chart) return;

    resizeObserverRef.current = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      if (chartRef.current !== chart) return;

      const { width, height: nextHeight } = entry.contentRect;
      if (width <= 0 || nextHeight <= 0) return;
      
      chart.applyOptions({ width, height: nextHeight } as ChartOptions);
      chart.timeScale().fitContent();
    });

    resizeObserverRef.current.observe(container);
  };

  /** 리사이즈 옵저버 정리 */
  const cleanupResizeObserver = () => {
    resizeObserverRef.current?.disconnect();
    resizeObserverRef.current = null;
  };

  /** 시리즈 데이터 업데이트 */
  const updateSeriesData = () => {
    if (!seriesRef.current) return;
    setSeriesData(seriesRef.current, data);
    if (fitContentOnUpdate) {
      chartRef.current?.timeScale().fitContent();
    }
  };

  /** 차트 옵션 업데이트 */
  const updateChartOptions = () => {
    if (!chartRef.current) return;
    chartRef.current.applyOptions({
      ...(options ?? {}),
      height,
    } as ChartOptions);
  };

  /** 시리즈 옵션 업데이트 */
  const updateSeriesOptions = () => {
    if (!seriesRef.current || !applySeriesOptions) return;
    applySeriesOptions(seriesRef.current, seriesOptions);
  };

  useEffect(() => {
    initChart();
    setupResizeObserver();
    return () => {
      cleanupResizeObserver();
      cleanupChart();
    };
     
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!autoResize) {
      cleanupResizeObserver();
      return;
    }
    setupResizeObserver();
    return cleanupResizeObserver;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoResize]);

  useEffect(() => {
    updateSeriesData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, fitContentOnUpdate, setSeriesData]);

  useEffect(() => {
    updateChartOptions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height, options]);

  useEffect(() => {
    updateSeriesOptions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applySeriesOptions, seriesOptions]);

  return { containerRef };
}
