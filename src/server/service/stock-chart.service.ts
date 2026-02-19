import type { ChartQuery, ChartResult } from "@/entities/stock-chart";
import type { ApiSuccess } from "@/shared/api/api-success";

import type { ApiError } from "../errors/api-error";
import { normalizeError } from "../http/error-response";
import { normalizeSuccess } from "../http/success-response";
import type { ChartProvider } from "../provider/chart";
import { chartProvider } from "../provider/chart";

class StockChartService {
  constructor(private readonly provider: ChartProvider) {}

  async getChart(
    symbol: string,
    options: ChartQuery
  ): Promise<ApiSuccess<ChartResult> | ApiError> {
    try {
      const result = await this.provider.getChart(symbol, options);
      return normalizeSuccess(this.provider.name, result);
    } catch (error) {
      return normalizeError(error, this.provider.name);
    }
  }
}

export const stockChartService = new StockChartService(chartProvider);
