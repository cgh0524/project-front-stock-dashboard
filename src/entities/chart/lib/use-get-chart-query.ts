import { useQuery } from "@tanstack/react-query";

import type { ChartQuery } from "../model";
import { getChart } from "./get-chart";
import { chartQueryKeys } from "./query-keys";

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
