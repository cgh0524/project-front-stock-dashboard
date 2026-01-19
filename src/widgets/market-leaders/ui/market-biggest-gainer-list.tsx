"use client";

import { MarketLeaderList } from "@/entities/market-leader";
import { useGetMarketBiggestGainersQuery } from "@/entities/market-leader/lib";

export const MarketBiggestGainerList = () => {
  const { data, isLoading, isError, error, refetch } =
    useGetMarketBiggestGainersQuery();
  const errorMessage =
    error instanceof Error
      ? error.message
      : "Failed to load biggest gainers.";

  return (
    <MarketLeaderList
      data={data ?? []}
      isLoading={isLoading}
      isError={isError}
      loadingMessage="Loading biggest gainers..."
      errorMessage={errorMessage}
      onRetry={refetch}
    />
  );
};
