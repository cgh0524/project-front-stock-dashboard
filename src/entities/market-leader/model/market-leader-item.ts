export type MarketLeaderItem = {
  /** 심볼 - ex) IDEX */
  symbol: string;
  /** 현재가 - ex) 0.0021 */
  price: number;
  /** 이름 - ex) Ideanomics, Inc. */
  name: string;
  /** 변동 금액 - ex) -0.0029 */
  change: number;
  /** 변동률 - ex) -58 */
  changePercentage: number;
  /** 거래소 - ex) NASDAQ */
  exchange: string;
};
