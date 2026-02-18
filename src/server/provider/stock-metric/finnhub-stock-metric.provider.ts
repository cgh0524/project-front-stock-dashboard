import type { StockMetricSummary } from "@/entities/stock-metric";
import { ERROR_SOURCE } from "@/server/errors/base-error";
import { fetcher } from "@/server/http/http-client";
import { parseOrFail } from "@/server/validation/zod-validate";

import type { ApiProviderConfig } from "../provider.config";
import { API_PROVIDER, getApiProviderConfig } from "../provider.config";
import { toStockMetricSummary } from "./finnhub-stock-metric.adapter";
import { finnhubStockMetricSchema } from "./finnhub-stock-metric.schema";
import type { StockMetricProvider } from "./stock-metric.provider";

export class FinnhubStockMetricProvider implements StockMetricProvider {
  readonly name = API_PROVIDER.FINNHUB;
  private readonly apiConfig: ApiProviderConfig = getApiProviderConfig(
    this.name
  );

  async getStockMetric(symbol: string): Promise<StockMetricSummary> {
    const symbolUpperCased = symbol.toUpperCase();
    const url = `${this.apiConfig.baseUrl}/stock/metric?symbol=${symbolUpperCased}&metric=all`;

    const data = await fetcher(url, {
      provider: this.name,
      next: {
        revalidate: 1000 * 60 * 60,
        tags: [symbolUpperCased, "stock-metric"],
      },
    });

    const dto = parseOrFail(finnhubStockMetricSchema, data, {
      source: ERROR_SOURCE.UPSTREAM,
      context: {
        provider: this.name,
        url,
      },
    });

    return toStockMetricSummary(dto);
  }
}
