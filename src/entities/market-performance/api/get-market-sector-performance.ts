import { toQueryString } from "@/server/provider/query-string";
import type { ApiSuccess } from "@/shared/api/api-success";
import { axiosClient } from "@/shared/api/axios";

import type {
  MarketSectorPerformance,
  MarketSectorPerformanceQuery,
} from "../types";

export const getMarketSectorPerformance = async (
  params: MarketSectorPerformanceQuery
): Promise<MarketSectorPerformance[]> => {
  const { data } = await axiosClient.get<ApiSuccess<MarketSectorPerformance[]>>(
    `/api/performance/market${toQueryString(params)}`
  );

  return data.data;
};
