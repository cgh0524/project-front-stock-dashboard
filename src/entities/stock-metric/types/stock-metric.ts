/** 주식 메트릭(정량 지표) 요약 */
export type StockMetricSummary = {
  /** 52주 최고가 */
  week52High?: number;
  /** 52주 최저가 */
  week52Low?: number;
  /** 52주 최저가 날짜 */
  week52LowDate?: string;
  /** 52주 가격 수익률(일간) */
  week52PriceReturnDaily?: number;
  /** 주당 매출 */
  salesPerShare?: number;
  /** 순이익률 */
  netMargin?: number;
  /** 유동비율 */
  currentRatio?: number;
};
