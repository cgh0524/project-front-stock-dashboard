import type { RecommendationTrend } from "@/entities/recommendation-trend";
import {
  type RecommendationTrendProvider,
  recommendationTrendProvider,
} from "@/server/provider/recommendation-trend";
import type { ApiSuccess } from "@/shared/api/api-success";

import type { ApiError } from "../errors/api-error";
import { normalizeError } from "../http/error-response";
import { normalizeSuccess } from "../http/success-response";

class RecommendationTrendService {
  constructor(private readonly provider: RecommendationTrendProvider) {}

  async getRecommendationTrends(
    symbol: string
  ): Promise<ApiSuccess<RecommendationTrend[]> | ApiError> {
    try {
      const result = await this.provider.getRecommendationTrends(symbol);
      return normalizeSuccess(this.provider.name, result);
    } catch (error) {
      return normalizeError(error, this.provider.name);
    }
  }
}

export const recommendationTrendService = new RecommendationTrendService(
  recommendationTrendProvider
);
