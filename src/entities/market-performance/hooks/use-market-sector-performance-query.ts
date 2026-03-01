import { useQuery } from "@tanstack/react-query";

import { CACHE_POLICY } from "@/shared/config/cache-policy";

import { getMarketSectorPerformance } from "../api/get-market-sector-performance";
import { marketPerformanceQueryKeys } from "../constants/query-keys";
import type { MarketSectorPerformanceQuery } from "../types";

export function useMarketSectorPerformanceQuery(
  params: MarketSectorPerformanceQuery
) {
  const { date, exchange, sector } = params;

  return useQuery({
    queryKey: marketPerformanceQueryKeys.sector({ date, exchange, sector }),
    queryFn: async () => await getMarketSectorPerformance(params),
    staleTime: CACHE_POLICY.marketPerformance.staleTimeMs,
  });
}
