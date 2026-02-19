export type RecommendationTrendDetailKeyParams = {
  symbol: string;
};

export const recommendationTrendQueryKeys = {
  detail: ({ symbol }: RecommendationTrendDetailKeyParams) =>
    ["recommendation-trend", symbol] as const,
} as const;
