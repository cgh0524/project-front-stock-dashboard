import { useQuery } from "@tanstack/react-query";

import { CACHE_POLICY } from "@/shared/config/cache-policy";

import { getKeyMarketIndices } from "../api/get-key-market-indices";
import { quoteQueryKeys } from "../constants/query-keys";

export const useKeyMarketIndicesQuery = () => {
  return useQuery({
    queryKey: quoteQueryKeys.keyMarketIndices(),
    queryFn: async () => await getKeyMarketIndices(),
    staleTime: CACHE_POLICY.quote.staleTimeMs,
  });
};
