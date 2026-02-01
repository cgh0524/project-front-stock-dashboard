import { useQuery } from "@tanstack/react-query";

import { getMarketBiggestGainers } from "./get-market-biggest-gainers";
import { marketLeaderQueryKeys } from "./query-keys";

export const useGetMarketBiggestGainersQuery = () => {
  return useQuery({
    queryKey: marketLeaderQueryKeys.biggestGainers(),
    queryFn: async () => await getMarketBiggestGainers(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};
