import { useQuery } from "@tanstack/react-query";

import { getMarketMostActives } from "./get-market-most-actives";
import { marketLeaderQueryKeys } from "./query-keys";

export const useGetMarketMostActivesQuery = () => {
  return useQuery({
    queryKey: marketLeaderQueryKeys.mostActives(),
    queryFn: async () => await getMarketMostActives(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};
