import type { StockMetricSummary } from "@/entities/stock-metric";
import {
  type StockMetricProvider,
  stockMetricProvider,
} from "@/server/provider/stock-metric";
import type { ApiSuccess } from "@/shared/api/api-success";

import type { ApiError } from "../errors/api-error";
import { normalizeError } from "../http/error-response";
import { normalizeSuccess } from "../http/success-response";

class StockMetricService {
  constructor(private readonly provider: StockMetricProvider) {}

  async getStockMetric(
    symbol: string
  ): Promise<ApiSuccess<StockMetricSummary> | ApiError> {
    try {
      const result = await this.provider.getStockMetric(symbol);
      return normalizeSuccess(this.provider.name, result);
    } catch (error) {
      return normalizeError(error, this.provider.name);
    }
  }
}

export const stockMetricService = new StockMetricService(stockMetricProvider);
