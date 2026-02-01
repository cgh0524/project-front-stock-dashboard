"use client";

import dayjs from "dayjs";
import { useParams } from "next/navigation";

import { StockChart } from "@/entities/chart";
import { useGetChartQuery } from "@/entities/chart";
import { EmptyContent, ErrorMessage, LoadingSpinner } from "@/shared/ui/fallback";

export type StockChartProps = {
  /** 기본 조회 기간 (일) */
  rangeDays?: number;
  /** 기본 간격 */
  interval?: "1d" | "1wk" | "1mo" | "1m" | "5m" | "15m" | "60m";
  /** 프리/애프터 포함 여부 */
  includePrePost?: boolean;
  height?: number;
  className?: string;
};

const DEFAULT_RANGE_DAYS = 30;
const DEFAULT_INTERVAL = "1d" as const;
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

  const {
    data: chartData,
    isLoading,
    error,
    refetch,
  } = useGetChartQuery({
    symbol: symbol as string,
    fromDate,
    toDate,
    interval,
    includePrePost,
  });

  const minHeight = height + DEFAULT_DATE_BAR_HEIGHT;
  const containerStyle = { minHeight: `${minHeight}px` };

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

  if (!chartData || chartData.data.length === 0) {
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
      data={chartData.data}
      height={height}
      className={className}
    />
  );
}
