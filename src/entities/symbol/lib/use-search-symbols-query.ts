import { useQuery } from "@tanstack/react-query";

import type { Symbol } from "@/entities/symbol";
import { getSearchSymbols } from "@/entities/symbol/lib/get-search-symbols";

export const SEARCH_SYMBOLS_QUERY_KEY = "search-symbols";

export const useSearchSymbolsQuery = ({
  query,
  enabled,
}: {
  query: string;
  enabled?: boolean;
}) => {
  return useQuery<Symbol[], Error>({
    queryKey: [SEARCH_SYMBOLS_QUERY_KEY, query],
    queryFn: () => getSearchSymbols(query),
    enabled,
    staleTime: 1000 * 60 * 2, // 2 minutes
    placeholderData: (previousData) => previousData,
  });
};

const data: Symbol[] = [
  {
    description: "Apple Inc.",
    displaySymbol: "AAPL",
    symbol: "AAPL",
    type: "Common Stock",
  },
  {
    description: "Microsoft Corporation",
    displaySymbol: "MSFT",
    symbol: "MSFT",
    type: "Common Stock",
  },
  {
    description: "Amazon.com Inc.",
    displaySymbol: "AMZN",
    symbol: "AMZN",
    type: "Common Stock",
  },
];
