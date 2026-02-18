"use client";

import type { CandleStickChartProps } from "@/shared/chart";
import { CandleStickChart, ChartTooltip } from "@/shared/chart";

import {
  formatCrosshairTime,
  toCandleStickData,
  toVolumeData,
} from "../lib/chart-mappers";
import type { ChartInterval, OHLCV } from "../model";
import { useCandlestickTooltip } from "./use-candlestick-tooltip";

export type StockChartProps = {
  data: OHLCV[];
  interval: ChartInterval;
  height?: CandleStickChartProps["height"];
  autoResize?: CandleStickChartProps["autoResize"];
  options?: CandleStickChartProps["options"];
  seriesOptions?: CandleStickChartProps["seriesOptions"];
  className?: CandleStickChartProps["className"];
  onVisibleRangeChange?: CandleStickChartProps["onVisibleRangeChange"];
};

export function StockChart({
  data,
  interval,
  height,
  autoResize,
  options,
  seriesOptions,
  className,
  onVisibleRangeChange,
}: StockChartProps) {
  const candleStickData = toCandleStickData(data);
  const volumeData = toVolumeData(data);
  const { tooltipState, onCrosshairMove } = useCandlestickTooltip();
  const chartOptions: CandleStickChartProps["options"] = {
    ...options,
    localization: {
      locale: options?.localization?.locale ?? "en-US",
      dateFormat: options?.localization?.dateFormat ?? "dd MMM 'yy",
      ...(options?.localization ?? {}),
      timeFormatter: (time) => formatCrosshairTime(time, interval),
    },
  };

  return (
    <div className="relative w-full">
      <CandleStickChart
        data={candleStickData}
        volume={volumeData}
        height={height}
        autoResize={autoResize}
        options={chartOptions}
        seriesOptions={seriesOptions}
        className={className}
        onCrosshairMove={onCrosshairMove}
        onVisibleRangeChange={onVisibleRangeChange}
      />
      <ChartTooltip
        open={tooltipState.open}
        x={tooltipState.x}
        y={tooltipState.y}
        items={tooltipState.items}
      />
    </div>
  );
}
