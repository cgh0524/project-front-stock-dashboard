export type Quote = {
  /** 심볼 */
  symbol: string;

  /** 현재가 */
  currentPrice: number;
  /** 최고점 */
  highPrice: number;
  /** 최저점 */
  lowPrice: number;
  /** 시가 */
  openPrice: number;
  /** 종가 */
  closePrice: number;

  /** 변동 금액 */
  changeAmount?: number;
  /** 변동률 */
  changePercentage?: number;
};
