import { useQuery } from "@tanstack/react-query";

import { CACHE_POLICY } from "@/shared/config/cache-policy";

import { getStockMetric } from "../api";
import { stockMetricQueryKeys } from "../constants";

export const useStockMetricQuery = ({ symbol }: { symbol: string }) => {
  return useQuery({
    queryKey: stockMetricQueryKeys.detail({ symbol }),
    queryFn: () => getStockMetric(symbol),
    staleTime: CACHE_POLICY.stockMetric.staleTimeMs,
  });
};
