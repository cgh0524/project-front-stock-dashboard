import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import dayjs from "dayjs";

import { marketLeaderQueryKeys } from "@/entities/market-leader";
import { marketPerformanceQueryKeys } from "@/entities/market-performance";
import { quoteQueryKeys } from "@/entities/quote";
import { marketPerformanceService } from "@/server/service/market-performance.service";
import { MARKET_EXCHANGE } from "@/shared/types";
import { KeyMarketIndices } from "@/widgets/stock-dashboard/key-market-indices";
import { getKeyMarketIndices } from "@/widgets/stock-dashboard/key-market-indices/api";
import { MarketLeaders } from "@/widgets/stock-dashboard/market-leaders";
import {
  getMarketBiggestGainers,
  getMarketBiggestLosers,
  getMarketMostActives,
} from "@/widgets/stock-dashboard/market-leaders/api";
import { MarketSectorPerformance } from "@/widgets/stock-dashboard/market-sector-performance";

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
    // 주요 시장 지수 조회
    queryClient.prefetchQuery({
      queryKey: quoteQueryKeys.keyMarketIndices(),
      queryFn: async () => await getKeyMarketIndices(),
    }),

    // 시장 성적 조회
    queryClient.prefetchQuery({
      queryKey: marketPerformanceQueryKeys.sector({
        date: TODAY,
        exchange: MARKET_EXCHANGE.NASDAQ,
        sector: undefined,
      }),
      queryFn: async () =>
        await getMarketSectorPerformance(TODAY, MARKET_EXCHANGE.NASDAQ),
    }),

    // 가장 많이 상승한 종목 조회
    queryClient.prefetchQuery({
      queryKey: marketLeaderQueryKeys.biggestGainers(),
      queryFn: async () => await getMarketBiggestGainers(),
    }),

    // 가장 많이 하락한 종목 조회
    queryClient.prefetchQuery({
      queryKey: marketLeaderQueryKeys.biggestLosers(),
      queryFn: async () => await getMarketBiggestLosers(),
    }),

    // 가장 거래가 활발한 종목 조회
    queryClient.prefetchQuery({
      queryKey: marketLeaderQueryKeys.mostActives(),
      queryFn: async () => await getMarketMostActives(),
    }),
  ]);

  return (
    <div className="flex flex-col gap-14">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <KeyMarketIndices />
        <MarketSectorPerformance />
        <MarketLeaders />
      </HydrationBoundary>
    </div>
  );
}
