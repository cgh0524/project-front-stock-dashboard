export type FinnhubSymbol = {
  /** 설명 - ex) APPLE INC */
  description: string;
  /** 표시 심볼 - ex) AAPL */
  displaySymbol: string;
  /** 심볼 - ex) AAPL */
  symbol: string;
  /** 타입 - ex) Common Stock */
  type: string;
};

export type FinnhubSymbolResult = {
  count: number;
  result: FinnhubSymbol[];
};

export type Symbol = {
  /** 설명 - ex) APPLE INC */
  description: string;
  /** 표시 심볼 - ex) AAPL */
  displaySymbol: string;
  /** 심볼 - ex) AAPL */
  symbol: string;
  /** 타입 - ex) Common Stock */
  type: string;
};

export type SymbolSearchResult = {
  count: number;
  result: Symbol[];
};
