import type { RecommendationTrend } from "@/entities/recommendation-trend";

import type { FinnhubRecommendationTrendDTO } from "./finnhub-recommendation-trend.schema";

const toSafeNumber = (value: unknown): number => {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
};

export const toRecommendationTrends = (
  payload: FinnhubRecommendationTrendDTO
): RecommendationTrend[] => {
  return payload.map((item) => ({
    buy: toSafeNumber(item.buy),
    hold: toSafeNumber(item.hold),
    period: item.period,
    sell: toSafeNumber(item.sell),
    strongBuy: toSafeNumber(item.strongBuy),
    strongSell: toSafeNumber(item.strongSell),
    symbol: item.symbol,
  }));
};
