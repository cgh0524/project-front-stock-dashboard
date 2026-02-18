import { useQuery } from "@tanstack/react-query";

import { getQuote } from "../api/get-quote";
import { quoteQueryKeys } from "../constants/query-keys";

export const useGetQuoteQuery = ({ symbol }: { symbol: string }) => {
  return useQuery({
    queryKey: quoteQueryKeys.detail({ symbol }),
    queryFn: () => getQuote(symbol),
    staleTime: 1000 * 60 * 2,
  });
};
