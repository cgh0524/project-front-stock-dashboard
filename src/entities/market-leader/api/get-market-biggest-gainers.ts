import type { ApiSuccess } from "@/shared/api/api-success";
import { axiosClient } from "@/shared/api/axios";

import type { MarketLeaderItemModel } from "../types";

export const getMarketBiggestGainers = async (): Promise<
  MarketLeaderItemModel[]
> => {
  const { data } = await axiosClient.get<ApiSuccess<MarketLeaderItemModel[]>>(
    `/api/market-leader/biggest-gainers`
  );

  return data.data;
};
