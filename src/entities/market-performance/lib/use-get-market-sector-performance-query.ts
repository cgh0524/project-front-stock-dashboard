import { useQuery } from "@tanstack/react-query";

import type { MarketSectorPerformanceQuery } from "../model";
import { getMarketSectorPerformance } from "./get-market-sector-performance";
import { marketPerformanceQueryKeys } from "./query-keys";

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
