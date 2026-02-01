import type { ApiSuccess } from "@/shared/api/api-success";
import { axiosClient } from "@/shared/api/axios";

import type { MarketLeaderItemModel } from "../model";

export const getMarketMostActives = async (): Promise<MarketLeaderItemModel[]> => {
  const { data } = await axiosClient.get<ApiSuccess<MarketLeaderItemModel[]>>(
    `/api/market-leader/most-actives`
  );

  return data.data;
};
