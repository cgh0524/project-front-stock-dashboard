import type { MarketLeaderItemModel } from "@/entities/market-leader";

import type { FmpMarketLeaderItemDTO } from "./fmp-market-leader.schema";

export function toMarketLeaderItem(
  payload: FmpMarketLeaderItemDTO
): MarketLeaderItemModel {
  return {
    symbol: payload.symbol,
    price: payload.price,
    name: payload.name,
    change: payload.change,
    changePercentage: payload.changesPercentage,
    exchange: payload.exchange,
  };
}
