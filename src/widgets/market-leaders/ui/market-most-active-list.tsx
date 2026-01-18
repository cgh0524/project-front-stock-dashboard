import { useGetMarketMostActivesQuery } from "@/entities/market-leader/lib";

import { MarketLeaderList } from "./market-leader-list";

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
