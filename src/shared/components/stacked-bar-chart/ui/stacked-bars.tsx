import type { CSSProperties } from "react";

import type { StackedBarChartItem, StackedBarChartSeries } from "../types";
import {
  getSeriesHeightPercent,
  getSeriesStyle,
  getSeriesValue,
  getTopSeriesKey,
  shouldRenderLabel,
} from "../utils/stacked-bars";

type StackedBarsProps = {
  data: StackedBarChartItem[];
  maxBarWidth?: number;
  maxTotal: number;
  series: StackedBarChartSeries[];
  showSegmentValue: boolean;
  valueFormatter: (value: number) => string;
};

export function StackedBars({
  data,
  maxBarWidth,
  maxTotal,
  series,
  showSegmentValue,
  valueFormatter,
}: StackedBarsProps) {
  const barStyle = maxBarWidth
    ? ({ maxWidth: `${maxBarWidth}px` } as CSSProperties)
    : undefined;

  const renderSeriesItem = ({
    item,
    seriesItem,
    topSeriesKey,
  }: {
    item: StackedBarChartItem;
    seriesItem: StackedBarChartSeries;
    topSeriesKey?: string;
  }) => {
    const value = getSeriesValue(item, seriesItem.key);

    if (value <= 0) return null;

    const heightPercent = getSeriesHeightPercent(value, maxTotal);
    const seriesStyle = getSeriesStyle(seriesItem, heightPercent);
    const isTopSeries = seriesItem.key === topSeriesKey;

    return (
      <div
        key={`${item.label}-${seriesItem.key}`}
        style={seriesStyle}
        className={`w-full flex items-center justify-center text-xs font-semibold ${
          isTopSeries ? "rounded-t-md" : ""
        }`}
      >
        {shouldRenderLabel(showSegmentValue, heightPercent)
          ? valueFormatter(value)
          : null}
      </div>
    );
  };

  return (
    <div className="absolute inset-0 flex items-end gap-3 px-2">
      {data.map((item, itemIndex) => {
        const topSeriesKey = getTopSeriesKey(item, series);

        return (
          <div
            key={`${item.label}-${itemIndex}`}
            className="flex-1 h-full min-w-0 flex justify-center"
          >
            <div
              className="h-full w-full flex flex-col-reverse"
              style={barStyle}
            >
              {series.map((seriesItem) =>
                renderSeriesItem({ item, seriesItem, topSeriesKey })
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
