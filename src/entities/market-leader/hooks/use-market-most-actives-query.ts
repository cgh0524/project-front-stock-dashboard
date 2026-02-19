import { useQuery } from "@tanstack/react-query";

import { getMarketMostActives } from "../api/get-market-most-actives";
import { marketLeaderQueryKeys } from "../constants/query-keys";

export const useMarketMostActivesQuery = () => {
  return useQuery({
    queryKey: marketLeaderQueryKeys.mostActives(),
    queryFn: async () => await getMarketMostActives(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};
