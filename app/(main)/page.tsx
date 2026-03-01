import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import dayjs from "dayjs";
import type { Metadata } from "next";

import { marketLeaderQueryKeys } from "@/entities/market-leader";
import { marketPerformanceQueryKeys } from "@/entities/market-performance";
import { quoteQueryKeys } from "@/entities/quote";
import { CACHE_POLICY } from "@/shared/config/cache-policy";
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
import { getMarketSectorPerformance } from "@/widgets/stock-dashboard/market-sector-performance/api";

export const metadata: Metadata = {
  title: "Stock Dashboard",
  description:
    "Dashboard for tracking key indices, sector performance, and top market leaders in one view.",
};

export default async function StockDashboard() {
  const queryClient = new QueryClient();

  const TODAY = dayjs().format("YYYY-MM-DD");
  const ONCE_A_WEEK_AGO = dayjs().subtract(7, "day").format("YYYY-MM-DD");

  await Promise.all([
    // 주요 시장 지수 조회
    queryClient.prefetchQuery({
      queryKey: quoteQueryKeys.keyMarketIndices(),
      queryFn: async () => await getKeyMarketIndices(),
      staleTime: CACHE_POLICY.quote.staleTimeMs,
    }),

    // 시장 성적 조회
    queryClient.prefetchQuery({
      queryKey: marketPerformanceQueryKeys.sector({
        date: TODAY,
        exchange: MARKET_EXCHANGE.NASDAQ,
        sector: undefined,
      }),
      queryFn: async () =>
        await getMarketSectorPerformance({
          date: TODAY,
          exchange: MARKET_EXCHANGE.NASDAQ,
        }),
      staleTime: CACHE_POLICY.marketPerformance.staleTimeMs,
    }),

    // 가장 많이 상승한 종목 조회
    queryClient.prefetchQuery({
      queryKey: marketLeaderQueryKeys.biggestGainers(),
      queryFn: async () => await getMarketBiggestGainers(),
      staleTime: CACHE_POLICY.marketLeader.staleTimeMs,
    }),

    // 가장 많이 하락한 종목 조회
    queryClient.prefetchQuery({
      queryKey: marketLeaderQueryKeys.biggestLosers(),
      queryFn: async () => await getMarketBiggestLosers(),
      staleTime: CACHE_POLICY.marketLeader.staleTimeMs,
    }),

    // 가장 거래가 활발한 종목 조회
    queryClient.prefetchQuery({
      queryKey: marketLeaderQueryKeys.mostActives(),
      queryFn: async () => await getMarketMostActives(),
      staleTime: CACHE_POLICY.marketLeader.staleTimeMs,
    }),
  ]);

  return (
    <div className="flex flex-col gap-14">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <KeyMarketIndices />
        <MarketSectorPerformance
          today={TODAY}
          minDate={ONCE_A_WEEK_AGO}
        />
        <MarketLeaders />
      </HydrationBoundary>
    </div>
  );
}
