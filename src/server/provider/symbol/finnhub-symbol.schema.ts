import { z } from "zod";

export const finnhubSymbolSchema = z.object({
  /** 설명 - ex) APPLE INC */
  description: z.string(),
  /** 표시 심볼 - ex) AAPL */
  displaySymbol: z.string(),
  /** 심볼 - ex) AAPL */
  symbol: z.string(),
  /** 타입 - ex) Common Stock */
  type: z.string(),
});

export const finnhubSymbolResultSchema = z.object({
  count: z.number(),
  result: z.array(finnhubSymbolSchema),
});

export type FinnhubSymbolDTO = z.infer<typeof finnhubSymbolSchema>;
export type FinnhubSymbolResultDTO = z.infer<typeof finnhubSymbolResultSchema>;
