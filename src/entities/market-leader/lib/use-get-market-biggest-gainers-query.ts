import { useQuery } from "@tanstack/react-query";

import { getMarketBiggestGainers } from "./get-market-biggest-gainers";

export const MARKET_BIGGEST_GAINERS_QUERY_KEY = "market-biggest-gainers";

export const useGetMarketBiggestGainersQuery = () => {
  return useQuery({
    queryKey: [MARKET_BIGGEST_GAINERS_QUERY_KEY],
    queryFn: async () => await getMarketBiggestGainers(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};
