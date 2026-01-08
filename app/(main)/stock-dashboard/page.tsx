import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import dayjs from "dayjs";

import { MARKET_SECTOR_PERFORMANCE_QUERY_KEY } from "@/entities/market-performance/lib";
import { marketPerformanceService } from "@/server/service/market-performance.service";
import { MARKET_EXCHANGE } from "@/shared/lib/types";
import { KeyMarketIndices } from "@/widgets/key-market-indices";
import { MarketSectorPerformance } from "@/widgets/market-sector-performance";

const getMarketSectorPerformance = async (date: string, exchange: string) => {
  const result = await marketPerformanceService.getMarketSectorPerformance({
    date,
    exchange,
  });

  if (result.ok) {
    return result.data;
  }

  throw new Error(result.message);
};

export default async function StockDashboard() {
  const queryClient = new QueryClient();

  const TODAY = dayjs().format("YYYY-MM-DD");

  await queryClient.prefetchQuery({
    queryKey: [
      MARKET_SECTOR_PERFORMANCE_QUERY_KEY,
      TODAY,
      MARKET_EXCHANGE.NASDAQ,
      null,
    ],
    queryFn: async () =>
      await getMarketSectorPerformance(TODAY, MARKET_EXCHANGE.NASDAQ),
  });

  return (
    <div className="flex flex-col gap-14">
      <KeyMarketIndices />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <MarketSectorPerformance />
      </HydrationBoundary>
    </div>
  );
}
