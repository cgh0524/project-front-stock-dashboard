import { z } from "zod";

export const finnhubRecommendationTrendItemSchema = z.object({
  buy: z.number(),
  hold: z.number(),
  period: z.string(),
  sell: z.number(),
  strongBuy: z.number(),
  strongSell: z.number(),
  symbol: z.string(),
});

export const finnhubRecommendationTrendSchema = z.array(
  finnhubRecommendationTrendItemSchema
);

export type FinnhubRecommendationTrendDTO = z.infer<
  typeof finnhubRecommendationTrendSchema
>;
