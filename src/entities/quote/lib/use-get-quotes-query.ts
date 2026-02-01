import { useQueries } from "@tanstack/react-query";

import type { Quote } from "../model";
import { getQuote } from "./get-quote";
import { quoteQueryKeys } from "./query-keys";

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
