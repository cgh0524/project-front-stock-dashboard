"use client";

import dayjs from "dayjs";
import { useParams } from "next/navigation";
import { useMemo } from "react";

import type { ChartInterval } from "@/entities/chart";
import { CHART_INTERVAL, StockChart } from "@/entities/chart";
import { useInfiniteChartQuery } from "@/entities/chart";
import { EmptyContent, ErrorMessage, LoadingSpinner } from "@/shared/ui/fallback";

import { useInfiniteChartScroll } from "../lib/use-infinite-chart-scroll";

export type StockChartProps = {
  /** 기본 조회 기간 (일) */
  rangeDays?: number;
  /** 기본 간격 */
  interval?: ChartInterval;
  /** 프리/애프터 포함 여부 */
  includePrePost?: boolean;
  height?: number;
  className?: string;
};

const DEFAULT_RANGE_DAYS = 90;
const DEFAULT_INTERVAL = CHART_INTERVAL.ONE_DAY;
const DEFAULT_DATE_BAR_HEIGHT = 26;

function getDateRange(rangeDays: number) {
  const toDate = dayjs().format("YYYY-MM-DD");
  const fromDate = dayjs().subtract(rangeDays, "day").format("YYYY-MM-DD");
  return { fromDate, toDate };
}

export function StockChartWidget({
  rangeDays = DEFAULT_RANGE_DAYS,
  interval = DEFAULT_INTERVAL,
  includePrePost,
  height = 300,
  className,
}: StockChartProps) {
  const { symbol } = useParams();
  const { fromDate, toDate } = getDateRange(rangeDays);

  /** 차트 컨테이너 스타일 관련 파생값 */
  const minHeight = (height ?? 0) + DEFAULT_DATE_BAR_HEIGHT;
  const containerStyle = { minHeight: `${minHeight}px` };

  const {
    data,
    isLoading,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteChartQuery({
    symbol: symbol as string,
    fromDate,
    toDate,
    interval,
    includePrePost,
  });

  const mergedData = useMemo(() => {
    if (!data?.pages?.length) return [];
    return [...data.pages].reverse().flatMap((page) => page.data);
  }, [data]);

  const { onVisibleRangeChange } = useInfiniteChartScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });



  if (isLoading) {
    return (
      <div className="flex items-center w-full py-6 bg-surface-default rounded-md" style={containerStyle}>
        <LoadingSpinner message="Loading chart..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center w-full py-6 bg-surface-default rounded-md" style={containerStyle}>
        <ErrorMessage message={error.message} retry={refetch} />
      </div>
    );
  }

  if (!mergedData.length) {
    return (
      <div
        className="flex items-center justify-center w-full py-6 bg-surface-default rounded-md"
        style={containerStyle}
      >
        <EmptyContent message="No chart data" size="lg" />
      </div>
    );
  }

  return (
    <StockChart
      data={mergedData}
      height={height}
      className={className}
      onVisibleRangeChange={onVisibleRangeChange}
    />
  );
}
