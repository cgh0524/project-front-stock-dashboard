import { z } from "zod";

import type { StockMetricSummary } from "@/entities/stock-metric";

import type { FinnhubStockMetricDTO } from "./finnhub-stock-metric.schema";

const stockMetricSummarySchema = z.object({
  week52High: z.number().optional(),
  week52Low: z.number().optional(),
  week52LowDate: z.string().optional(),
  week52PriceReturnDaily: z.number().optional(),
  salesPerShare: z.number().optional(),
  netMargin: z.number().optional(),
  currentRatio: z.number().optional(),
});

const toOptionalNumber = (value: unknown): number | undefined => {
  return typeof value === "number" && Number.isFinite(value)
    ? value
    : undefined;
};

const toOptionalString = (value: unknown): string | undefined => {
  return typeof value === "string" && value.trim().length > 0
    ? value
    : undefined;
};

const pickLatestSeriesValue = (
  metricSeries: FinnhubStockMetricDTO["series"]["annual"][string] | undefined
): number | undefined => {
  if (!metricSeries || metricSeries.length === 0) {
    return undefined;
  }

  const [latest] = [...metricSeries].sort((a, b) => {
    return a.period < b.period ? 1 : -1;
  });

  return toOptionalNumber(latest.v);
};

/** Finnhub stock/metric 응답에서 대시보드에 필요한 고정 도메인만 추출 */
export function toStockMetricSummary(
  payload: FinnhubStockMetricDTO
): StockMetricSummary {
  const mapped = {
    week52High: toOptionalNumber(payload.metric["52WeekHigh"]),
    week52Low: toOptionalNumber(payload.metric["52WeekLow"]),
    week52LowDate: toOptionalString(payload.metric["52WeekLowDate"]),
    week52PriceReturnDaily: toOptionalNumber(
      payload.metric["52WeekPriceReturnDaily"]
    ),
    salesPerShare: pickLatestSeriesValue(payload.series.annual.salesPerShare),
    netMargin: pickLatestSeriesValue(payload.series.annual.netMargin),
    currentRatio: pickLatestSeriesValue(payload.series.annual.currentRatio),
  };

  return stockMetricSummarySchema.parse(mapped);
}
