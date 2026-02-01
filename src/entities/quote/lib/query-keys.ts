export type QuoteDetailKeyParams = {
  symbol: string;
};

export type QuotesKeyParams = {
  query: string;
};

export const quoteQueryKeys = {
  keyMarketIndices: () => ["key-market-indices"] as const,
  detail: ({ symbol }: QuoteDetailKeyParams) => ["quote", symbol] as const,
  quotes: ({ query }: QuotesKeyParams) => ["quotes", query] as const,
} as const;
