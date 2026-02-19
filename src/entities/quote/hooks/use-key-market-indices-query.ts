import { useQuery } from "@tanstack/react-query";

import { getKeyMarketIndices } from "../api/get-key-market-indices";
import { quoteQueryKeys } from "../constants/query-keys";

export const useKeyMarketIndicesQuery = () => {
  return useQuery({
    queryKey: quoteQueryKeys.keyMarketIndices(),
    queryFn: async () => await getKeyMarketIndices(),
    staleTime: 1000 * 60 * 5,
  });
};
