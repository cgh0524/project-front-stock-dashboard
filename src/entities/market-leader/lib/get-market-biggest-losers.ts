import type { ApiSuccess } from "@/shared/api/api-success";
import { axiosClient } from "@/shared/api/axios";

import type { MarketLeaderItem } from "../model";

export const getMarketBiggestLosers = async (): Promise<MarketLeaderItem[]> => {
  const { data } = await axiosClient.get<ApiSuccess<MarketLeaderItem[]>>(
    `/api/market-leader/biggest-losers`
  );

  return data.data;
};
