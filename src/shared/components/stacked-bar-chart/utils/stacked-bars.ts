import type { CSSProperties } from "react";

import { MIN_SEGMENT_LABEL_HEIGHT_PERCENT } from "../constants/stacked-bar-chart";
import type { StackedBarChartItem, StackedBarChartSeries } from "../types";

/** 값이 있는 시리즈 중 막대 상단에 위치하는 시리즈 key를 찾는다. */
export function getTopSeriesKey(
  item: StackedBarChartItem,
  series: StackedBarChartSeries[]
): string | undefined {
  return [...series]
    .reverse()
    .find((seriesItem) => (item.values[seriesItem.key] ?? 0) > 0)?.key;
}

/** 주어진 시리즈 key의 값을 반환한다. 값이 없으면 0으로 처리한다. */
export function getSeriesValue(item: StackedBarChartItem, key: string): number {
  return item.values[key] ?? 0;
}

/** 시리즈 값이 전체 최대값에서 차지하는 높이 비율(%)을 계산한다. */
export function getSeriesHeightPercent(value: number, maxTotal: number): number {
  return (value / maxTotal) * 100;
}

/** 세그먼트 렌더링에 필요한 인라인 스타일 객체를 만든다. */
export function getSeriesStyle(
  seriesItem: StackedBarChartSeries,
  heightPercent: number
): CSSProperties {
  return {
    backgroundColor: seriesItem.color,
    color: seriesItem.textColor ?? "#ffffff",
    height: `${heightPercent}%`,
  };
}

/** 높이가 충분한 세그먼트에만 라벨을 표시하도록 판단한다. */
export function shouldRenderLabel(
  showSegmentValue: boolean,
  heightPercent: number
): boolean {
  return showSegmentValue && heightPercent >= MIN_SEGMENT_LABEL_HEIGHT_PERCENT;
}
