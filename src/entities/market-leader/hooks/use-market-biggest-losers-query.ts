import { useQuery } from "@tanstack/react-query";

import { CACHE_POLICY } from "@/shared/config/cache-policy";

import { getMarketBiggestLosers } from "../api/get-market-biggest-losers";
import { marketLeaderQueryKeys } from "../constants/query-keys";

export const useMarketBiggestLosersQuery = () => {
  return useQuery({
    queryKey: marketLeaderQueryKeys.biggestLosers(),
    queryFn: async () => await getMarketBiggestLosers(),
    staleTime: CACHE_POLICY.marketLeader.staleTimeMs,
  });
};
