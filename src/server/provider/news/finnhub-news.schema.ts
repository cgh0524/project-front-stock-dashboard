import { z } from "zod";

export const finnhubNewsItemSchema = z.object({
  category: z.string(),
  datetime: z.number(),
  headline: z.string(),
  id: z.number(),
  image: z.string().nullable().optional(),
  related: z.string().nullable().optional(),
  source: z.string(),
  summary: z.string().nullable().optional(),
  url: z.string(),
});

export const finnhubNewsSchema = z.array(finnhubNewsItemSchema);

export type FinnhubNewsDTO = z.infer<typeof finnhubNewsSchema>;
