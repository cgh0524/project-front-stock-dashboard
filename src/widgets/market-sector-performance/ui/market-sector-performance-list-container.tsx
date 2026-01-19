import {
  MarketSectorPerformanceList,
  useGetMarketSectorPerformanceQuery,
} from "@/entities/market-performance";
import {
  EmptyContent,
  ErrorMessage,
  LoadingSpinner,
} from "@/shared/ui/fallback";

export type MarketSectorPerformanceListContainerProps = {
  /** 날짜 (YYYY-MM-DD) */
  date: string;
  /** 거래소 (NASDAQ, NYSE, AMEX) */
  exchange: string;
};

export function MarketSectorPerformanceListContainer({
  date,
  exchange,
}: MarketSectorPerformanceListContainerProps) {
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

  if (!performances || performances?.length === 0) {
    return (
      <div className="flex items-center justify-center w-full min-h-44 py-6 bg-surface-default rounded-md">
        <EmptyContent
          message="No market sector performances found."
          size="lg"
        />
      </div>
    );
  }

  return <MarketSectorPerformanceList data={performances} />;
}
