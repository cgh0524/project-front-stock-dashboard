import { useQuery } from "@tanstack/react-query";

import { getKeyMarketIndices } from "./get-key-market-indices";

export const KEY_MARKET_INDICES_QUERY_KEY = "key-market-indices";

export const useGetKeyMarketIndicesQuery = () => {
  return useQuery({
    queryKey: [KEY_MARKET_INDICES_QUERY_KEY],
    queryFn: async () => await getKeyMarketIndices(),
    staleTime: 1000 * 60 * 5,
  });
};
