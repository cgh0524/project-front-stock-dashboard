import { MarketLeaderList } from "@/entities/market-leader";
import { useGetMarketMostActivesQuery } from "@/entities/market-leader/lib";

export const MarketMostActiveList = () => {
  const { data, isLoading, isError, error, refetch } =
    useGetMarketMostActivesQuery();
  const errorMessage =
    error instanceof Error ? error.message : "Failed to load most actives.";

  return (
    <MarketLeaderList
      data={data ?? []}
      isLoading={isLoading}
      isError={isError}
      loadingMessage="Loading most actives..."
      errorMessage={errorMessage}
      onRetry={refetch}
    />
  );
};
