import { useQuery } from "@tanstack/react-query";

import { getMarketBiggestLosers } from "./get-market-biggest-losers";
import { marketLeaderQueryKeys } from "./query-keys";

export const useGetMarketBiggestLosersQuery = () => {
  return useQuery({
    queryKey: marketLeaderQueryKeys.biggestLosers(),
    queryFn: async () => await getMarketBiggestLosers(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};
