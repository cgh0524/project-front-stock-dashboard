import { useQuery } from "@tanstack/react-query";

import { getKeyMarketIndices } from "./get-key-market-indices";
import { quoteQueryKeys } from "./query-keys";

export const useGetKeyMarketIndicesQuery = () => {
  return useQuery({
    queryKey: quoteQueryKeys.keyMarketIndices(),
    queryFn: async () => await getKeyMarketIndices(),
    staleTime: 1000 * 60 * 5,
  });
};
