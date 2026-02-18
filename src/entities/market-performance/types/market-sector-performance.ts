export type MarketSectorPerformance = {
  /** 날짜 - ex) 2025-12-29 */
  date: string;
  /** 섹터 - ex) Technology */
  sector: string;
  /** 거래소 - ex) NASDAQ */
  exchange: string;
  /** 평균 변동률 - ex) 0.012345 */
  averageChange: number;
};

export interface MarketSectorPerformanceQuery {
  /** 날짜 - ex) 2025-12-29 */
  date: string;
  /** 섹터 - ex) Technology */
  sector?: string;
  /** 거래소 - ex) NASDAQ */
  exchange?: string;
}
