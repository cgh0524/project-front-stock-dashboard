import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import dayjs from "dayjs";

import {
  MARKET_BIGGEST_GAINERS_QUERY_KEY,
  MARKET_BIGGEST_LOSERS_QUERY_KEY,
  MARKET_MOST_ACTIVES_QUERY_KEY,
} from "@/entities/market-leader/lib";
import { MARKET_SECTOR_PERFORMANCE_QUERY_KEY } from "@/entities/market-performance/lib";
import { marketPerformanceService } from "@/server/service/market-performance.service";
import { MARKET_EXCHANGE } from "@/shared/lib/types";
import { KeyMarketIndices } from "@/widgets/key-market-indices";
import { MarketLeaders } from "@/widgets/market-leaders";
import {
  getMarketBiggestGainers,
  getMarketBiggestLosers,
  getMarketMostActives,
} from "@/widgets/market-leaders/lib";
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
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
      },
    },
  });

  const TODAY = dayjs().format("YYYY-MM-DD");

  await Promise.all([
    // 시장 성적 조회
    queryClient.prefetchQuery({
      queryKey: [
        MARKET_SECTOR_PERFORMANCE_QUERY_KEY,
        TODAY,
        MARKET_EXCHANGE.NASDAQ,
        null,
      ],
      queryFn: async () =>
        getMarketSectorPerformance(TODAY, MARKET_EXCHANGE.NASDAQ),
    }),

    // 가장 많이 상승한 종목 조회
    queryClient.prefetchQuery({
      queryKey: [MARKET_BIGGEST_GAINERS_QUERY_KEY],
      queryFn: async () => getMarketBiggestGainers(),
    }),

    // 가장 많이 하락한 종목 조회
    queryClient.prefetchQuery({
      queryKey: [MARKET_BIGGEST_LOSERS_QUERY_KEY],
      queryFn: async () => getMarketBiggestLosers(),
    }),

    // 가장 거래가 활발한 종목 조회
    queryClient.prefetchQuery({
      queryKey: [MARKET_MOST_ACTIVES_QUERY_KEY],
      queryFn: async () => getMarketMostActives(),
    }),
  ]);

  return (
    <div className="flex flex-col gap-14">
      <KeyMarketIndices />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <MarketSectorPerformance />
        <MarketLeaders />
      </HydrationBoundary>
    </div>
  );
}
