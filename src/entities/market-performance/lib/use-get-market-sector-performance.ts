import { useQuery } from "@tanstack/react-query";

import type { MarketSectorPerformanceQuery } from "../model";
import { getMarketSectorPerformance } from "./get-market-sector-performance";

export const MARKET_SECTOR_PERFORMANCE_QUERY_KEY = "market-sector-performance";

export function useGetMarketSectorPerformance(
  params: MarketSectorPerformanceQuery
) {
  const { date, exchange, sector } = params;

  return useQuery({
    queryKey: [MARKET_SECTOR_PERFORMANCE_QUERY_KEY, date, exchange, sector],
    queryFn: () => getMarketSectorPerformance(params),
  });
}
