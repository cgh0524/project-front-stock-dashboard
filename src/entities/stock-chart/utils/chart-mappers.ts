import dayjs from "dayjs";

import type { CandleStickData, VolumeData } from "@/shared/lightweight-chart";

import type { ChartInterval, OHLCV } from "../types";
import { CHART_INTERVAL, CHART_VOLUME_COLORS } from "../types";

export function toCandleStickData(data: OHLCV[]): CandleStickData[] {
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

export function toVolumeData(data: OHLCV[]): VolumeData[] {
  return data.flatMap((item) => {
    if (item.volume === null) return [];

    const timestamp = dayjs(item.time);
    if (!timestamp.isValid()) return [];

    let color: string = CHART_VOLUME_COLORS.neutral;
    if (item.open !== null && item.close !== null) {
      color =
        item.close >= item.open
          ? CHART_VOLUME_COLORS.up
          : CHART_VOLUME_COLORS.down;
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

function toDayjsFromChartTime(time: unknown) {
  if (typeof time === "number") return dayjs.unix(time);
  if (typeof time === "string") return dayjs(time);

  if (
    time &&
    typeof time === "object" &&
    "year" in time &&
    "month" in time &&
    "day" in time
  ) {
    const value = time as { year: number; month: number; day: number };
    return dayjs(
      `${value.year}-${String(value.month).padStart(2, "0")}-${String(
        value.day,
      ).padStart(2, "0")}`,
    );
  }

  return null;
}

export function formatCrosshairTime(time: unknown, interval: ChartInterval) {
  const date = toDayjsFromChartTime(time);
  if (!date || !date.isValid()) return "";

  if (interval === CHART_INTERVAL.ONE_HOUR) return date.format("YYYY-MM-DD HH");
  if (interval === CHART_INTERVAL.ONE_MONTH) return date.format("YYYY-MM");
  return date.format("YYYY-MM-DD");
}
