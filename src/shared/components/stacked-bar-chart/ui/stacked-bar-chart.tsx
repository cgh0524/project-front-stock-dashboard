"use client";

import {
  DEFAULT_STACKED_BAR_CHART_HEIGHT_PX,
  DEFAULT_STACKED_BAR_CHART_MAX_BAR_WIDTH_PX,
  DEFAULT_STACKED_BAR_CHART_TICK_COUNT,
} from "../constants/stacked-bar-chart";
import { useStackedBarChartModel } from "../hooks/use-stacked-bar-chart-model";
import type { StackedBarChartProps } from "../types";
import { ChartLegend } from "./chart-legend";
import { GridLines } from "./grid-lines";
import { StackedBars } from "./stacked-bars";
import { XAxisLabels } from "./x-axis-labels";
import { YAxisLabels } from "./y-axis-labels";

export function StackedBarChart({
  className,
  data,
  height = DEFAULT_STACKED_BAR_CHART_HEIGHT_PX,
  maxBarWidth = DEFAULT_STACKED_BAR_CHART_MAX_BAR_WIDTH_PX,
  series,
  showLegend = true,
  showSegmentValue = true,
  valueFormatter = (value) => String(value),
  yTickCount = DEFAULT_STACKED_BAR_CHART_TICK_COUNT,
}: StackedBarChartProps) {
  const { maxTotal, ticks } = useStackedBarChartModel(data, series, yTickCount);

  return (
    <div className={className}>
      <div className="flex gap-3" style={{ height }}>
        <YAxisLabels ticks={ticks} yTickCount={yTickCount} />

        <div className="flex-1 h-full relative">
          <GridLines ticks={ticks} yTickCount={yTickCount} />
          <StackedBars
            data={data}
            maxBarWidth={maxBarWidth}
            maxTotal={maxTotal}
            series={series}
            showSegmentValue={showSegmentValue}
            valueFormatter={valueFormatter}
          />
        </div>
      </div>

      <XAxisLabels data={data} />
      {showLegend && <ChartLegend series={series} />}
    </div>
  );
}
