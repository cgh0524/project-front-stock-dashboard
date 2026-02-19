import type { RecommendationTrend } from "@/entities/recommendation-trend";

import type { ApiProvider } from "../provider.config";
import { FinnhubRecommendationTrendProvider } from "./finnhub-recommendation-trend.provider";

export interface RecommendationTrendProvider {
  readonly name: ApiProvider;
  getRecommendationTrends(symbol: string): Promise<RecommendationTrend[]>;
}

export const recommendationTrendProvider =
  new FinnhubRecommendationTrendProvider();
