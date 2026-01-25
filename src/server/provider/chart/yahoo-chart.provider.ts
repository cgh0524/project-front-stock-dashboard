import YahooFinance from "yahoo-finance2";

import type { ChartQuery, ChartResult } from "@/entities/chart";
import { ERROR_SOURCE } from "@/server/errors/base-error";
import { parseOrFail } from "@/server/validation/zod-validate";

import { API_PROVIDER } from "../provider.config";
import type { ChartProvider } from "./chart.provider";
import { toChartResult, toYahooChartQuery } from "./yahoo-chart.adapter";
import { yahooChartSchema } from "./yahoo-chart.schema";

const yahooFinance = new YahooFinance();

export class YahooChartProvider implements ChartProvider {
  readonly name = API_PROVIDER.YAHOO;

  async getChart(
    symbol: string,
    options: ChartQuery
  ): Promise<ChartResult> {
    const providerOptions = toYahooChartQuery(options);
    const data = await yahooFinance.chart(symbol, providerOptions);
    const dto = parseOrFail(yahooChartSchema, data, {
      source: ERROR_SOURCE.UPSTREAM,
      context: { provider: this.name, symbol },
    });
    return toChartResult(dto);
  }
}
