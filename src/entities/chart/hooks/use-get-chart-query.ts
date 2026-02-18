import { useQuery } from "@tanstack/react-query";

import { getChart } from "../api/get-chart";
import { chartQueryKeys } from "../constants/query-keys";
import type { ChartQuery } from "../types";

type ChartQueryParams = ChartQuery & {
  symbol: string;
};

export const useGetChartQuery = (params: ChartQueryParams) => {
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
    staleTime: 1000 * 60 * 2,
  });
};
