import { z } from "zod";

export const yahooChartQuerySchema = z.object({
  /** 시작일 - ex) 2024-01-01 */
  period1: z.string().min(1),
  /** 종료일 - ex) 2024-12-31 */
  period2: z.string().optional(),
  /** 간격 */
  interval: z
    .enum(["1m", "5m", "15m", "60m", "1d", "1wk", "1mo"])
    .default("1d"),
  /** 프리/애프터 포함 여부 */
  includePrePost: z
    .preprocess((value) => {
      if (value === "true") return true;
      if (value === "false") return false;
      return value;
    }, z.boolean())
    .default(true),
  /** 반환 타입 */
  return: z.literal("array").default("array"),
});

export type YahooChartQuery = z.infer<typeof yahooChartQuerySchema>;

const yahooChartMetaSchema = z
  .object({
    currency: z.string(),
    symbol: z.string(),
    exchangeName: z.string(),
    instrumentType: z.string(),
    firstTradeDate: z.date().nullable(),
    regularMarketTime: z.date(),
    gmtoffset: z.number(),
    timezone: z.string(),
    exchangeTimezoneName: z.string(),
    regularMarketPrice: z.number(),
  })
  .passthrough();

const yahooChartQuoteSchema = z
  .object({
    date: z.date(),
    high: z.number().nullable(),
    low: z.number().nullable(),
    open: z.number().nullable(),
    close: z.number().nullable(),
    volume: z.number().nullable(),
    adjclose: z.number().nullable().optional(),
  })
  .passthrough();

const yahooChartDividendSchema = z
  .object({
    amount: z.number(),
    date: z.date(),
  })
  .passthrough();

const yahooChartSplitSchema = z
  .object({
    date: z.date(),
    numerator: z.number(),
    denominator: z.number(),
    splitRatio: z.string(),
  })
  .passthrough();

const yahooChartEventsSchema = z
  .object({
    dividends: z.array(yahooChartDividendSchema).optional(),
    splits: z.array(yahooChartSplitSchema).optional(),
  })
  .passthrough();

export const yahooChartSchema = z
  .object({
    meta: yahooChartMetaSchema,
    quotes: z.array(yahooChartQuoteSchema),
    events: yahooChartEventsSchema.optional(),
  })
  .passthrough();

export type YahooChartDTO = z.infer<typeof yahooChartSchema>;
