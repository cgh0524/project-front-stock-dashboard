import { z } from "zod";

export const finnhubQuoteSchema = z.object({
  /** 현재가 - current price */
  c: z.number(),
  /** 변동 금액 - change amount (달러) */
  d: z.number().optional(),
  /** 변동률 - change percentage */
  dp: z.number().optional(),
  /** 최고점 - high price */
  h: z.number(),
  /** 최저점 - low price */
  l: z.number(),
  /** 시가 - open price */
  o: z.number(),
  /** 종가 - close price */
  pc: z.number(),
});

export type FinnhubQuoteDTO = z.infer<typeof finnhubQuoteSchema>;
