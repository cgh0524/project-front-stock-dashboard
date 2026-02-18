import { useQueries } from "@tanstack/react-query";

import { getQuote } from "../api/get-quote";
import { quoteQueryKeys } from "../constants/query-keys";
import type { Quote } from "../types";

export const useGetQuotesQuery = ({
  queries,
  staleTime,
}: {
  queries: string[];
  staleTime: number;
}) => {
  return useQueries<Quote[]>({
    queries: queries.map((query) => ({
      queryKey: quoteQueryKeys.quotes({ query }),
      queryFn: () => getQuote(query),
      staleTime,
    })),
  });
};
