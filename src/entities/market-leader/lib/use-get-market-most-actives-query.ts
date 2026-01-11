import { useQuery } from "@tanstack/react-query";

import { getMarketMostActives } from "./get-market-most-actives";

export const MARKET_MOST_ACTIVES_QUERY_KEY = "market-most-actives";

export const useGetMarketMostActivesQuery = () => {
  return useQuery({
    queryKey: [MARKET_MOST_ACTIVES_QUERY_KEY],
    queryFn: async () => await getMarketMostActives(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};
