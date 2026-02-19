"use client";

import dayjs from "dayjs";

import {
  StackedBarChart,
  type StackedBarChartItem,
  type StackedBarChartSeries,
} from "@/shared/components/stacked-bar-chart";

import type { RecommendationTrend } from "../types";

export type RecommendationTrendChartProps = {
  className?: string;
  data: RecommendationTrend[];
  height?: number;
};

const SERIES: StackedBarChartSeries[] = [
  { key: "strongSell", label: "Strong Sell", color: "#8B1E2D" },
  { key: "sell", label: "Sell", color: "#EF5350" },
  { key: "hold", label: "Hold", color: "#B58B1D" },
  { key: "buy", label: "Buy", color: "#22C55E" },
  { key: "strongBuy", label: "Strong Buy", color: "#15803D" },
];

function toChartData(items: RecommendationTrend[]): StackedBarChartItem[] {
  return [...items]
    .sort((left, right) => left.period.localeCompare(right.period))
    .map((item) => ({
      label: dayjs(item.period).format("MMM YYYY"),
      values: {
        strongSell: item.strongSell,
        sell: item.sell,
        hold: item.hold,
        buy: item.buy,
        strongBuy: item.strongBuy,
      },
    }));
}

export function RecommendationTrendChart({
  className,
  data,
  height = 320,
}: RecommendationTrendChartProps) {
  const chartData = toChartData(data);

  return (
    <StackedBarChart
      className={className}
      data={chartData}
      height={height}
      series={SERIES}
      yTickCount={3}
    />
  );
}
