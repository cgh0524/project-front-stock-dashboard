import { useQuery } from "@tanstack/react-query";

import type { ChartQuery } from "../model";
import { getChart } from "./get-chart";

export const CHART_QUERY_KEY = "chart";

type ChartQueryParams = ChartQuery & {
  symbol: string;
};

export const useGetChartQuery = (params: ChartQueryParams) => {
  const { symbol, fromDate, toDate, interval, includePrePost } = params;

  return useQuery({
    queryKey: [
      CHART_QUERY_KEY,
      symbol,
      fromDate,
      toDate,
      interval,
      includePrePost,
    ],
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
