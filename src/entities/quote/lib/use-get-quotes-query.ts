import { useQueries } from "@tanstack/react-query";

import type { Quote } from "../model";
import { getQuote } from "./get-quote";

export const QUOTES_QUERY_KEY = "quote";

export const useGetQuotesQuery = ({
  queries,
  staleTime,
}: {
  queries: string[];
  staleTime: number;
}) => {
  return useQueries<Quote[]>({
    queries: queries.map((query) => ({
      queryKey: [QUOTES_QUERY_KEY, query],
      queryFn: () => getQuote(query),
      staleTime,
    })),
  });
};
