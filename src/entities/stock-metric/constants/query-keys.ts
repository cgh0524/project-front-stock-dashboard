export type StockMetricDetailKeyParams = {
  symbol: string;
};

export const stockMetricQueryKeys = {
  detail: ({ symbol }: StockMetricDetailKeyParams) =>
    ["stock-metric", symbol] as const,
} as const;
