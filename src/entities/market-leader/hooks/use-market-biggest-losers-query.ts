import { useQuery } from "@tanstack/react-query";

import { getMarketBiggestLosers } from "../api/get-market-biggest-losers";
import { marketLeaderQueryKeys } from "../constants/query-keys";

export const useMarketBiggestLosersQuery = () => {
  return useQuery({
    queryKey: marketLeaderQueryKeys.biggestLosers(),
    queryFn: async () => await getMarketBiggestLosers(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};
