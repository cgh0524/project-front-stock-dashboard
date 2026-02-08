import type { InfiniteData } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import type { ChartQuery, ChartResult } from "../model";
import { getChart } from "./get-chart";
import { chartQueryKeys } from "./query-keys";

export type InfiniteChartPageParam = {
  fromDate: ChartQuery["fromDate"];
  toDate?: ChartQuery["toDate"];
};

export type UseInfiniteChartQueryParams = {
  symbol: string;
  fromDate: ChartQuery["fromDate"];
  toDate?: ChartQuery["toDate"];
  interval?: ChartQuery["interval"];
  includePrePost?: ChartQuery["includePrePost"];
};

const DEFAULT_RANGE_DAYS = 30;

/** 현재 구간 기준으로 동일 길이의 이전 구간 생성 */
function getPreviousRange(param: InfiniteChartPageParam): InfiniteChartPageParam {
  const from = dayjs(param.fromDate);
  const to = param.toDate ? dayjs(param.toDate) : dayjs(param.fromDate);
  const diffDays = Math.max(1, to.diff(from, "day"));
  const rangeDays = diffDays || DEFAULT_RANGE_DAYS;

  const nextTo = from.subtract(1, "day");
  const nextFrom = nextTo.subtract(rangeDays, "day");

  return {
    fromDate: nextFrom.format("YYYY-MM-DD"),
    toDate: nextTo.format("YYYY-MM-DD"),
  };
}

export function useInfiniteChartQuery(params: UseInfiniteChartQueryParams) {
  const { symbol, fromDate, toDate, interval, includePrePost } = params;

  return useInfiniteQuery<
    ChartResult,
    Error,
    InfiniteData<ChartResult>,
    ReturnType<typeof chartQueryKeys.infinite>,
    InfiniteChartPageParam
  >({
    queryKey: chartQueryKeys.infinite({
      symbol,
      query: { interval, includePrePost },
    }),
    /** 최초 조회 구간 */
    initialPageParam: { fromDate, toDate },
    /** pageParam으로 받은 기간을 그대로 조회 */
    queryFn: ({ pageParam }) =>
      getChart(symbol, {
        fromDate: pageParam.fromDate,
        toDate: pageParam.toDate,
        interval,
        includePrePost,
      }),
    /** 데이터가 더 있으면 이전 구간으로 확장 */
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (!lastPage?.data?.length) return undefined;
      return getPreviousRange(lastPageParam);
    },
    refetchOnWindowFocus: false,
  });
}
