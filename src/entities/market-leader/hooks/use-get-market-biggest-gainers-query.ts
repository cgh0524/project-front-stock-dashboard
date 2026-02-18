import { useQuery } from "@tanstack/react-query";

import { getMarketBiggestGainers } from "../api/get-market-biggest-gainers";
import { marketLeaderQueryKeys } from "../constants/query-keys";

export const useGetMarketBiggestGainersQuery = () => {
  return useQuery({
    queryKey: marketLeaderQueryKeys.biggestGainers(),
    queryFn: async () => await getMarketBiggestGainers(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};
