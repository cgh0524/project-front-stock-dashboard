import { useQueries } from "@tanstack/react-query";

import { CACHE_POLICY } from "@/shared/config/cache-policy";

import { getQuote } from "../api/get-quote";
import { quoteQueryKeys } from "../constants/query-keys";
import type { Quote } from "../types";

export const useQuotesQuery = ({
  queries,
  staleTime = CACHE_POLICY.quote.staleTimeMs,
}: {
  queries: string[];
  staleTime?: number;
}) => {
  return useQueries<Quote[]>({
    queries: queries.map((query) => ({
      queryKey: quoteQueryKeys.quotes({ query }),
      queryFn: () => getQuote(query),
      staleTime,
    })),
  });
};
