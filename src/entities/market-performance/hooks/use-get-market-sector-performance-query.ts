import { useQuery } from "@tanstack/react-query";

import { getMarketSectorPerformance } from "../api/get-market-sector-performance";
import { marketPerformanceQueryKeys } from "../constants/query-keys";
import type { MarketSectorPerformanceQuery } from "../types";

export function useGetMarketSectorPerformanceQuery(
  params: MarketSectorPerformanceQuery
) {
  const { date, exchange, sector } = params;

  return useQuery({
    queryKey: marketPerformanceQueryKeys.sector({ date, exchange, sector }),
    queryFn: async () => await getMarketSectorPerformance(params),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}
