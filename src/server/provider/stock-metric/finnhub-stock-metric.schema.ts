import { z } from "zod";

const metricValueSchema = z.union([z.number(), z.string(), z.null()]);

const annualSeriesItemSchema = z.object({
  period: z.string(),
  v: z.number().nullable(),
});

export const finnhubStockMetricSchema = z.object({
  metric: z.record(z.string(), metricValueSchema),
  metricType: z.string(),
  symbol: z.string(),
  series: z
    .object({
      annual: z
        .record(z.string(), z.array(annualSeriesItemSchema))
        .optional()
        .default({}),
    })
    .optional()
    .default({ annual: {} }),
});

export type FinnhubStockMetricDTO = z.infer<typeof finnhubStockMetricSchema>;
