import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import dayjs from "dayjs";

import { MARKET_SECTOR_PERFORMANCE_QUERY_KEY } from "@/entities/market-performance/lib";
import { getMarketSectorPerformance } from "@/entities/market-performance/lib/get-market-sector-performance";
import { MARKET_EXCHANGE } from "@/shared/lib/types";
import { KeyMarketIndices } from "@/widgets/key-market-indices";
import { MarketSectorPerformance } from "@/widgets/market-sector-performance";

export default async function StockDashboard() {
  const queryClient = new QueryClient();

  const TODAY = dayjs().format("YYYY-MM-DD");

  await queryClient.prefetchQuery({
    queryKey: [
      MARKET_SECTOR_PERFORMANCE_QUERY_KEY,
      TODAY,
      MARKET_EXCHANGE.NASDAQ,
    ],
    queryFn: async () =>
      await getMarketSectorPerformance({
        date: TODAY,
        exchange: MARKET_EXCHANGE.NASDAQ,
      }),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  return (
    <div className="flex flex-col gap-12">
      <KeyMarketIndices />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <MarketSectorPerformance />
      </HydrationBoundary>
    </div>
  );
}
