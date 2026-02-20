import type { RecommendationTrend } from "@/entities/recommendation-trend";
import { ERROR_SOURCE } from "@/server/errors/base-error";
import { fetcher } from "@/server/http/http-client";
import { parseOrFail } from "@/server/validation/zod-validate";

import type { ApiProviderConfig } from "../provider.config";
import { API_PROVIDER, getApiProviderConfig } from "../provider.config";
import { toRecommendationTrends } from "./finnhub-recommendation-trend.adapter";
import { finnhubRecommendationTrendSchema } from "./finnhub-recommendation-trend.schema";
import type { RecommendationTrendProvider } from "./recommendation-trend.provider";

export class FinnhubRecommendationTrendProvider
  implements RecommendationTrendProvider
{
  readonly name = API_PROVIDER.FINNHUB;
  private readonly apiConfig: ApiProviderConfig = getApiProviderConfig(
    this.name
  );

  async getRecommendationTrends(symbol: string): Promise<RecommendationTrend[]> {
    const symbolUpperCased = symbol.toUpperCase();
    const url = `${this.apiConfig.baseUrl}/stock/recommendation?symbol=${symbolUpperCased}`;

    const data = await fetcher(url, {
      provider: this.name,
      next: {
        revalidate: 3600, // 1시간
        tags: [symbolUpperCased, "recommendation-trend"],
      },
    });

    const dto = parseOrFail(finnhubRecommendationTrendSchema, data, {
      source: ERROR_SOURCE.UPSTREAM,
      context: {
        provider: this.name,
        url,
      },
    });

    return toRecommendationTrends(dto);
  }
}
