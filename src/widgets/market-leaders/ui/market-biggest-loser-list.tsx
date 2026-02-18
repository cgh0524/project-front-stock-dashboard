import { MarketLeaderList } from "@/entities/market-leader";
import { useGetMarketBiggestLosersQuery } from "@/entities/market-leader";
import { EmptyContent, ErrorMessage, LoadingSpinner } from "@/shared/ui/fallback";

export const MarketBiggestLoserList = () => {
  const { data, isLoading, isError, error, refetch } =
    useGetMarketBiggestLosersQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full min-h-[500px] py-6 bg-surface-default rounded-md">
        <LoadingSpinner message="Loading biggest gainers..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-items-center w-full min-h-[500px] py-6 bg-surface-default rounded-md">
        <ErrorMessage message={error?.message ?? "Failed to load biggest gainers."} retry={refetch} />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center w-full min-h-[500px] py-6 bg-surface-default rounded-md">
        <EmptyContent message="No biggest gainers found." size="lg" />
      </div>
    );
  }

  return <MarketLeaderList data={data} />;
};
