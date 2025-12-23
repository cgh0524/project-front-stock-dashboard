import { useQuery } from "@tanstack/react-query";

import type { Symbol } from "@/entities/stock";
import { getSearchSymbols } from "@/entities/stock/lib/get-search-symbols";

export const useSearchSymbols = ({
  query,
  enabled,
}: {
  query: string;
  enabled?: boolean;
}) => {
  return useQuery<Symbol[], Error>({
    queryKey: ["search-symbols", query],
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
