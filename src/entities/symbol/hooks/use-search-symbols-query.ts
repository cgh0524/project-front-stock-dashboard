import { useQuery } from "@tanstack/react-query";

import type { Symbol } from "@/entities/symbol";

import { getSearchSymbols } from "../api/get-search-symbols";
import { symbolQueryKeys } from "../constants/query-keys";

export const useSearchSymbolsQuery = ({
  query,
  enabled,
}: {
  query: string;
  enabled?: boolean;
}) => {
  return useQuery<Symbol[], Error>({
    queryKey: symbolQueryKeys.search({ query }),
    queryFn: () => getSearchSymbols(query),
    enabled,
    staleTime: 1000 * 60 * 2, // 2 minutes
    placeholderData: (previousData) => previousData,
  });
};
