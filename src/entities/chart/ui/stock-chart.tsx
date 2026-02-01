"use client";

import dayjs from "dayjs";

import type {
  CandleStickChartProps,
  CandleStickData,
} from "@/shared/ui/chart";
import { CandleStickChart } from "@/shared/ui/chart";

import type { OHLCV } from "../model";

export type StockChartProps = {
  data: OHLCV[];
  height?: CandleStickChartProps["height"];
  autoResize?: CandleStickChartProps["autoResize"];
  options?: CandleStickChartProps["options"];
  seriesOptions?: CandleStickChartProps["seriesOptions"];
  className?: CandleStickChartProps["className"];
  onReady?: CandleStickChartProps["onReady"];
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
  onReady,
}: StockChartProps) {
  const candleStickData = toCandleStickData(data);

  return (
    <CandleStickChart
      data={candleStickData}
      height={height}
      autoResize={autoResize}
      options={options}
      seriesOptions={seriesOptions}
      className={className}
      onReady={onReady}
    />
  );
}
