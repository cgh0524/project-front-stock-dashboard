export type SearchSymbolsKeyParams = {
  query: string;
};

export const symbolQueryKeys = {
  search: ({ query }: SearchSymbolsKeyParams) => ["search-symbols", query] as const,
} as const;
