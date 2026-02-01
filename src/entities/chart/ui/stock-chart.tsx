"use client";

import dayjs from "dayjs";

import type { BarChartProps, BarData } from "@/shared/ui/chart";
import { CandleStickChart } from "@/shared/ui/chart";

import type { OHLCV } from "../model";

export type StockChartProps = {
  data: OHLCV[];
  height?: BarChartProps["height"];
  autoResize?: BarChartProps["autoResize"];
  options?: BarChartProps["options"];
  seriesOptions?: BarChartProps["seriesOptions"];
  className?: BarChartProps["className"];
};

function toBarData(data: OHLCV[]): BarData[] {
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
        time: timestamp.unix() as BarData["time"],
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
}: StockChartProps) {
  const barData = toBarData(data);

  return (
    <CandleStickChart
      data={barData}
      height={height}
      autoResize={autoResize}
      options={options}
      seriesOptions={seriesOptions}
      className={className}
    />
  );
}
