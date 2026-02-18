import { useQuery } from "@tanstack/react-query";

import { getStockMetric } from "../api";
import { stockMetricQueryKeys } from "../constants";

export const useGetStockMetricQuery = ({ symbol }: { symbol: string }) => {
  return useQuery({
    queryKey: stockMetricQueryKeys.detail({ symbol }),
    queryFn: () => getStockMetric(symbol),
    staleTime: 1000 * 60 * 10,
  });
};
