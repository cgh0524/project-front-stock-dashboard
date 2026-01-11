import { useQuery } from "@tanstack/react-query";

import { getMarketBiggestLosers } from "./get-market-biggest-losers";

export const MARKET_BIGGEST_LOSERS_QUERY_KEY = "market-biggest-losers";

export const useGetMarketBiggestLosersQuery = () => {
  return useQuery({
    queryKey: [MARKET_BIGGEST_LOSERS_QUERY_KEY],
    queryFn: async () => await getMarketBiggestLosers(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};
