import type { StockMetricSummary } from "@/entities/stock-metric";

import type { ApiProvider } from "../provider.config";
import { FinnhubStockMetricProvider } from "./finnhub-stock-metric.provider";

export interface StockMetricProvider {
  readonly name: ApiProvider;
  getStockMetric(symbol: string): Promise<StockMetricSummary>;
}

export const stockMetricProvider = new FinnhubStockMetricProvider();
