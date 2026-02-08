"use client";

import dayjs from "dayjs";

import type { CandleStickChartProps, CandleStickData } from "@/shared/ui/chart";
import { CandleStickChart, ChartTooltip } from "@/shared/ui/chart";

import type { OHLCV } from "../model";
import { useCandlestickTooltip } from "./use-candlestick-tooltip";

export type StockChartProps = {
  data: OHLCV[];
  height?: CandleStickChartProps["height"];
  autoResize?: CandleStickChartProps["autoResize"];
  options?: CandleStickChartProps["options"];
  seriesOptions?: CandleStickChartProps["seriesOptions"];
  className?: CandleStickChartProps["className"];
  onVisibleRangeChange?: CandleStickChartProps["onVisibleRangeChange"];
};

function toCandleStickData(data: OHLCV[]): CandleStickData[] {
  return data.flatMap((item) => {
    if (
      item.open === null ||
      item.high === null ||
      item.low === null ||
      item.close === null
    )
      return [];

    const timestamp = dayjs(item.time);
    if (!timestamp.isValid()) return [];

    return [
      {
        time: timestamp.unix() as CandleStickData["time"],
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close,
      },
    ];
  });
}

export function StockChart({
  data,
  height,
  autoResize,
  options,
  seriesOptions,
  className,
  onVisibleRangeChange,
}: StockChartProps) {
  const candleStickData = toCandleStickData(data);
  const { tooltipState, onCrosshairMove } = useCandlestickTooltip();

  return (
    <div className="relative w-full">
      <CandleStickChart
        data={candleStickData}
        height={height}
        autoResize={autoResize}
        options={options}
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
