import { useQuery } from "@tanstack/react-query";

import { CACHE_POLICY } from "@/shared/config/cache-policy";

import { getChart } from "../api/get-chart";
import { chartQueryKeys } from "../constants/query-keys";
import type { ChartQuery } from "../types";

type ChartQueryParams = ChartQuery & {
  symbol: string;
};

export const useStockChartQuery = (params: ChartQueryParams) => {
  const { symbol, fromDate, toDate, interval, includePrePost } = params;

  return useQuery({
    queryKey: chartQueryKeys.detail({
      symbol,
      query: { fromDate, toDate, interval, includePrePost },
    }),
    queryFn: () =>
      getChart(symbol, {
        fromDate,
        toDate,
        interval,
        includePrePost,
      }),
    staleTime: CACHE_POLICY.stockChart.staleTimeMs,
  });
};
