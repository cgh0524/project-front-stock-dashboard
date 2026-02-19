import type { ChartQuery, ChartResult } from "@/entities/stock-chart";

import type { ApiProvider } from "../provider.config";
import { YahooChartProvider } from "./yahoo-chart.provider";

export interface ChartProvider {
  readonly name: ApiProvider;
  getChart(symbol: string, options: ChartQuery): Promise<ChartResult>;
}

export const chartProvider = new YahooChartProvider();
