import { useQuery } from "@tanstack/react-query";

import { CACHE_POLICY } from "@/shared/config/cache-policy";

import { getMarketBiggestGainers } from "../api/get-market-biggest-gainers";
import { marketLeaderQueryKeys } from "../constants/query-keys";

export const useMarketBiggestGainersQuery = () => {
  return useQuery({
    queryKey: marketLeaderQueryKeys.biggestGainers(),
    queryFn: async () => await getMarketBiggestGainers(),
    staleTime: CACHE_POLICY.marketLeader.staleTimeMs,
  });
};
