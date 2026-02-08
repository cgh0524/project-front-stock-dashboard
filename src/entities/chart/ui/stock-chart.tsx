"use client";

import dayjs from "dayjs";

import type { CandleStickChartProps, CandleStickData, VolumeData } from "@/shared/ui/chart";
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

const VOLUME_UP_COLOR = "rgba(16, 185, 129, 0.6)";
const VOLUME_DOWN_COLOR = "rgba(239, 68, 68, 0.6)";
const VOLUME_NEUTRAL_COLOR = "rgba(148, 163, 184, 0.6)";

function toVolumeData(data: OHLCV[]): VolumeData[] {
  return data.flatMap((item) => {
    if (item.volume === null) return [];

    const timestamp = dayjs(item.time);
    if (!timestamp.isValid()) return [];

    let color = VOLUME_NEUTRAL_COLOR;
    if (item.open !== null && item.close !== null) {
      color = item.close >= item.open ? VOLUME_UP_COLOR : VOLUME_DOWN_COLOR;
    }

    return [
      {
        time: timestamp.unix() as VolumeData["time"],
        value: item.volume,
        color,
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
  const volumeData = toVolumeData(data);
  const { tooltipState, onCrosshairMove } = useCandlestickTooltip();

  return (
    <div className="relative w-full">
      <CandleStickChart
        data={candleStickData}
        volume={volumeData}
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
