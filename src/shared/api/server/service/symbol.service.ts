import { fetcher } from "@/shared/api/server/http/http-client";
import {
  type ApiProvider,
  getApiProviderConfig,
} from "@/shared/api/server/provider/api-provider";
import type { FinnhubSymbolResult, Symbol } from "@/shared/domain/symbol";

import { toSymbols } from "../adapter/symbol.adapter";

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
