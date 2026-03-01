"server-only";

import type { RecommendationTrend } from "@/entities/recommendation-trend";
import { recommendationTrendService } from "@/server/service/recommendation-trend.service";

export const getRecommendationTrends = async (
  symbol: string
): Promise<RecommendationTrend[]> => {
  const result = await recommendationTrendService.getRecommendationTrends(symbol);

  if (result.ok) {
    return result.data;
  }

  throw new Error(result.message);
};
