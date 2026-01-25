import { z } from "zod";

export const fmpMarketSectorPerformanceSchema = z.object({
  /** 날짜 - ex) 2025-12-29 */
  date: z.string(),
  /** 섹터 - ex) Technology */
  sector: z.string(),
  /** 거래소 - ex) NASDAQ */
  exchange: z.string(),
  /** 평균 변동률 - ex) 0.012345 */
  averageChange: z.number(),
});

export type FmpMarketSectorPerformanceDTO = z.infer<
  typeof fmpMarketSectorPerformanceSchema
>;

export type FmpMarketSectorPerformanceQuery = {
  /** 날짜 - ex) 2025-12-29 */
  date: string;
  /** 섹터 - ex) Technology */
  sector?: string;
  /** 거래소 - ex) NASDAQ */
  exchange?: string;
};

export const fmpIndustryPerformanceSchema = z.object({
  /** 날짜 - ex) 2025-12-29 */
  date: z.string(),
  /** 산업 - ex) Technology */
  industry: z.string(),
  /** 거래소 - ex) NASDAQ */
  exchange: z.string(),
  /** 평균 변동률 - ex) 0.012345 */
  averageChange: z.number(),
});

export type FmpIndustryPerformanceDTO = z.infer<
  typeof fmpIndustryPerformanceSchema
>;

export type FmpIndustryPerformanceQuery = {
  /** 날짜 - ex) 2025-12-29 */
  date: string;
  /** 산업 - ex) Technology */
  industry?: string;
  /** 거래소 - ex) NASDAQ */
  exchange?: string;
};
