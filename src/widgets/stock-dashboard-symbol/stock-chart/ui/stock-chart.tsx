"use client";

import dayjs from "dayjs";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

import type { ChartInterval, OHLCV } from "@/entities/chart";
import {
  CHART_DEFAULT_INTERVAL,
  CHART_DEFAULT_INTRADAY_RANGE_DAYS,
  CHART_DEFAULT_RANGE_DAYS,
  CHART_INTRADAY_INTERVALS,
  ChartIntervalSwitch,
  StockChart,
} from "@/entities/chart";
import { useInfiniteChartQuery } from "@/entities/chart";
import { EmptyContent, ErrorMessage, LoadingSpinner } from "@/shared/ui/fallback";

import { useInfiniteChartScroll } from "../hooks/use-infinite-chart-scroll";

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

/** 차트 컨테이너 스타일 관련 파생값 */
const DEFAULT_DATE_BAR_HEIGHT = 26;

/** 조회 기간에 따라 시작/종료 날짜 계산 */
function getDateRange(rangeDays: number) {
  const toDate = dayjs().format("YYYY-MM-DD");
  const fromDate = dayjs().subtract(rangeDays, "day").format("YYYY-MM-DD");
  return { fromDate, toDate };
}

/**
 * 무한 스크롤로 합쳐진 페이지 데이터에서 시간축 충돌을 정리한다.
 * - 페이지 경계에서 중복된 time 캔들을 하나로 제거
 * - lightweight-charts 요구사항에 맞게 time 오름차순으로 정렬
 */
function mergeChartDataBytimeAsc(pages: { data: OHLCV[] }[]): OHLCV[] {
  const uniqueByTimestamp = new Map<number, OHLCV>();

  for (const page of pages) {
    for (const item of page.data) {
      const timestamp = dayjs(item.time);
      if (!timestamp.isValid()) continue;
      uniqueByTimestamp.set(timestamp.unix(), item);
    }
  }

  return [...uniqueByTimestamp.entries()]
    .sort(([left], [right]) => left - right)
    .map(([, item]) => item);
}

export function StockChartWidget({
  rangeDays,
  interval = CHART_DEFAULT_INTERVAL,
  includePrePost,
  height = 300,
  className,
}: StockChartProps) {
  const { symbol } = useParams();
  const [selectedInterval, setSelectedInterval] = useState<ChartInterval>(interval);

  /** 
   * 조회 기간에 따라 시작/종료 날짜 계산 
   * - 일봉 이상 기간은 기본 조회 기간
   * - 일봉 이하 기간은 기본 일봉 조회 기간 
   */
  const effectiveRangeDays =
    rangeDays ??
    (CHART_INTRADAY_INTERVALS.includes(selectedInterval)
      ? CHART_DEFAULT_INTRADAY_RANGE_DAYS
      : CHART_DEFAULT_RANGE_DAYS);

  const { fromDate, toDate } = getDateRange(effectiveRangeDays);

  /** 차트 컨테이너 스타일 관련 파생값 */
  const minHeight = (height ?? 0) + DEFAULT_DATE_BAR_HEIGHT;
  const containerStyle = { minHeight: `${minHeight}px` };

  const {
    data,
    isLoading,
    error,
    refetch,
    fetchNextPage: fetchPreviousData,
    hasNextPage: hasMorePreviousData,
    isFetchingNextPage: isFetchingPreviousData,
  } = useInfiniteChartQuery({
    symbol: symbol as string,
    fromDate,
    toDate,
    interval: selectedInterval,
    includePrePost,
  });

  const mergedData = useMemo(() => {
    if (!data?.pages?.length) return [];
    return mergeChartDataBytimeAsc(data.pages);
  }, [data]);

  const { onVisibleRangeChange } = useInfiniteChartScroll({
    fetchPreviousData,
    hasMorePreviousData,
    isFetchingPreviousData,
    loadedDataCount: mergedData.length,
  });
  const isEmpty = !isLoading && !error && mergedData.length === 0;
  const isReady = !isLoading && !error && mergedData.length > 0;

  return (
    <div className="flex flex-col gap-3 w-full">
      <ChartIntervalSwitch
        value={selectedInterval}
        onChange={setSelectedInterval}
      />

      {isLoading && (
        <div className="flex items-center w-full py-6 bg-surface-default rounded-md" style={containerStyle}>
          <LoadingSpinner message="Loading chart..." />
        </div>
      )}

      {!!error && (
        <div className="flex items-center w-full py-6 bg-surface-default rounded-md" style={containerStyle}>
          <ErrorMessage message={error.message} retry={refetch} />
        </div>
      )}

      {isEmpty && (
        <div
          className="flex items-center justify-center w-full py-6 bg-surface-default rounded-md"
          style={containerStyle}
        >
          <EmptyContent message="No chart data" size="lg" />
        </div>
      )}

      {isReady && (
        <StockChart
          key={selectedInterval}
          data={mergedData}
          interval={selectedInterval}
          height={height}
          className={className}
          onVisibleRangeChange={onVisibleRangeChange}
        />
      )}
    </div>
  );
}
