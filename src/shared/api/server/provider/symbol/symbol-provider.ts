import type { Symbol } from "@/shared/domain/symbol";

import { API_PROVIDER, type ApiProvider } from "../api-provider";
import { FinnhubSymbolProvider } from "./finnhub-symbol.provider";

export interface SymbolProvider {
  searchSymbols(query: string): Promise<Symbol[]>;
}

type ProviderFactory = () => SymbolProvider;

const providerFactories: Partial<Record<ApiProvider, ProviderFactory>> = {
  [API_PROVIDER.FINNHUB]: () => new FinnhubSymbolProvider(API_PROVIDER.FINNHUB),
};

export const createSymbolProvider = (provider: ApiProvider): SymbolProvider => {
  const factory = providerFactories[provider];

  if (!factory)
    throw new Error(`SymbolProvider not implemented for provider: ${provider}`);
  return factory();
};
