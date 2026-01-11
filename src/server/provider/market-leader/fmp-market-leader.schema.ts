import { z } from "zod";

export const fmpMarketLeaderItemSchema = z.object({
  /** 심볼 - ex) IDEX */
  symbol: z.string(),
  /** 현재가 - ex) 0.0021 */
  price: z.number(),
  /** 이름 - ex) Ideanomics, Inc. */
  name: z.string(),
  /** 변동 금액 - ex) -0.0029 */
  change: z.number(),
  /** 변동률 - ex) -58 */
  changesPercentage: z.number(),
  /** 거래소 - ex) NASDAQ */
  exchange: z.string(),
});

export type FmpMarketLeaderItemDTO = z.infer<typeof fmpMarketLeaderItemSchema>;
