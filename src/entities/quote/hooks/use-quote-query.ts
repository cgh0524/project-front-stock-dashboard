import { useQuery } from "@tanstack/react-query";

import { CACHE_POLICY } from "@/shared/config/cache-policy";

import { getQuote } from "../api/get-quote";
import { quoteQueryKeys } from "../constants/query-keys";

export const useQuoteQuery = ({ symbol }: { symbol: string }) => {
  return useQuery({
    queryKey: quoteQueryKeys.detail({ symbol }),
    queryFn: () => getQuote(symbol),
    staleTime: CACHE_POLICY.quote.staleTimeMs,
  });
};
