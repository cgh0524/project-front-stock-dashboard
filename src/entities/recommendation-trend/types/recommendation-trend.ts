/** 매수 의견 */
export type RecommendationTrend = {
  /** 매수 */
  buy: number;
  /** 보유 */
  hold: number;
  /** 매도 */
  sell: number;
  /** 강력 매수 */
  strongBuy: number;
  /** 강력 매도 */
  strongSell: number;
  /** 심볼 (티커)*/
  symbol: string;
  /** 기간 */
  period: string;
};
