import { useGetMarketSectorPerformanceQuery } from "@/entities/market-performance";
import {
  EmptyContent,
  ErrorMessage,
  LoadingSpinner,
} from "@/shared/ui/fallback";

import { MarketSectorPerformanceItem } from "./market-sector-performance-item";

export type MarketSectorPerformanceListProps = {
  /** 날짜 (YYYY-MM-DD) */
  date: string;
  /** 거래소 (NASDAQ, NYSE, AMEX) */
  exchange: string;
};

export function MarketSectorPerformanceList({
  date,
  exchange,
}: MarketSectorPerformanceListProps) {
  const {
    data: performances,
    error: performancesError,
    isLoading,
    refetch,
  } = useGetMarketSectorPerformanceQuery({
    date: date,
    exchange: exchange,
  });

  if (isLoading) {
    return (
      <div className="flex items-center w-full min-h-44 py-6 bg-surface-default rounded-md">
        <LoadingSpinner message="Loading market sector performances..." />
      </div>
    );
  }

  if (performancesError) {
    return (
      <div className="w-full min-h-44 py-6 bg-surface-default rounded-md">
        <ErrorMessage message={performancesError.message} retry={refetch} />
      </div>
    );
  }

  if (performances?.length === 0) {
    return (
      <div className="flex items-center justify-center w-full min-h-44 py-6 bg-surface-default rounded-md">
        <EmptyContent
          message="No market sector performances found."
          size="lg"
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {performances?.map((performance) => (
        <MarketSectorPerformanceItem
          key={performance.sector}
          data={performance}
        />
      ))}
    </div>
  );
}
