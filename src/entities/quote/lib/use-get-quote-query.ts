import { useQuery } from "@tanstack/react-query";

import { getQuote } from "./get-quote";

export const QUOTE_QUERY_KEY = "quote";

export const useGetQuoteQuery = ({ symbol }: { symbol: string }) => {
  return useQuery({
    queryKey: [QUOTE_QUERY_KEY, symbol],
    queryFn: () => getQuote(symbol),
    staleTime: 1000 * 60 * 2,
  });
};