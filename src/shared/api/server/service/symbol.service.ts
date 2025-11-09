import { fetcher } from "@/shared/api/server/http/http-client";
import {
  type ApiProvider,
  getApiProviderConfig,
} from "@/shared/api/server/provider/api-provider";
import type { FinnhubSymbolResult, Symbol } from "@/shared/domain/symbol";

/** Finnhub 응답을 도메인 심볼 리스트로 변환 */
export const toSymbols = (payload: FinnhubSymbolResult): Symbol[] => {
  return payload.result.map((item) => ({
    description: item.description,
    displaySymbol: item.displaySymbol,
    symbol: item.symbol,
    type: item.type,
  }));
};

/** 공급자 심볼 검색 */
export const searchSymbols = async (
  provider: ApiProvider,
  query: string
): Promise<Symbol[]> => {
  const { baseUrl } = getApiProviderConfig(provider);

  const raw = await fetcher<FinnhubSymbolResult>(
    `${baseUrl}/search?q=${query}`,
    { provider }
  );

  return toSymbols(raw);
};
