import type { ChartQuery } from "../types";

export type ChartDetailKeyParams = {
  symbol: string;
  query: ChartQuery;
};

export type ChartInfiniteKeyParams = {
  symbol: string;
  query: Omit<ChartQuery, "fromDate" | "toDate">;
};

export const chartQueryKeys = {
  base: () => ["chart"] as const,
  detail: ({ symbol, query }: ChartDetailKeyParams) =>
    [
      ...chartQueryKeys.base(),
      symbol,
      query.fromDate,
      query.toDate,
      query.interval,
      query.includePrePost,
    ] as const,
  infinite: ({ symbol, query }: ChartInfiniteKeyParams) =>
    [
      ...chartQueryKeys.base(),
      "infinite",
      symbol,
      query.interval,
      query.includePrePost,
    ] as const,
} as const;
