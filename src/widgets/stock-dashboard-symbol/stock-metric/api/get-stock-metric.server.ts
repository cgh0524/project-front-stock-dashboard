import "server-only";

import type { StockMetricSummary } from "@/entities/stock-metric";
import { stockMetricService } from "@/server/service/stock-metric.service";

export const getStockMetric = async (
  symbol: string
): Promise<StockMetricSummary> => {
  const result = await stockMetricService.getStockMetric(symbol);

  if (result.ok) {
    return result.data;
  }

  throw new Error(result.message);
};
