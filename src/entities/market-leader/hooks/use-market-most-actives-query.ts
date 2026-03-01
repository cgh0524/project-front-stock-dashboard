import { useQuery } from "@tanstack/react-query";

import { CACHE_POLICY } from "@/shared/config/cache-policy";

import { getMarketMostActives } from "../api/get-market-most-actives";
import { marketLeaderQueryKeys } from "../constants/query-keys";

export const useMarketMostActivesQuery = () => {
  return useQuery({
    queryKey: marketLeaderQueryKeys.mostActives(),
    queryFn: async () => await getMarketMostActives(),
    staleTime: CACHE_POLICY.marketLeader.staleTimeMs,
  });
};
