import { type ApiProvider } from "@/shared/api/server/provider/provider.config";
import { createSymbolProvider } from "@/shared/api/server/provider/symbol";
import type { Symbol } from "@/shared/domain/symbol";

/** 공급자 심볼 검색 */
export const searchSymbols = async (
  provider: ApiProvider,
  query: string
): Promise<Symbol[]> => {
  const symbolProvider = createSymbolProvider(provider);
  return symbolProvider.searchSymbols(query);
};
