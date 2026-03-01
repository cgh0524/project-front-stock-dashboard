import { useQuery } from "@tanstack/react-query";

import type { Symbol } from "@/entities/symbol";
import { CACHE_POLICY } from "@/shared/config/cache-policy";

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
    staleTime: CACHE_POLICY.symbolSearch.staleTimeMs,
    placeholderData: (previousData) => previousData,
  });
};
