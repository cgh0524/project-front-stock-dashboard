import { MarketLeaderList } from "@/entities/market-leader";
import { useGetMarketBiggestLosersQuery } from "@/entities/market-leader/lib";

export const MarketBiggestLoserList = () => {
  const { data, isLoading, isError, error, refetch } =
    useGetMarketBiggestLosersQuery();
  const errorMessage =
    error instanceof Error ? error.message : "Failed to load biggest losers.";

  return (
    <MarketLeaderList
      data={data ?? []}
      isLoading={isLoading}
      isError={isError}
      loadingMessage="Loading biggest losers..."
      errorMessage={errorMessage}
      onRetry={refetch}
    />
  );
};
