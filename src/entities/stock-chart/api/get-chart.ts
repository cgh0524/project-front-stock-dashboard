import type { ApiSuccess } from "@/shared/api/api-success";
import { axiosClient } from "@/shared/api/axios";
import { toQueryString } from "@/shared/utils/query-string";

import type { ChartQuery, ChartResult } from "../types";

export const getChart = async (
  symbol: string,
  query: ChartQuery
): Promise<ChartResult> => {

  const { data } = await axiosClient.get<ApiSuccess<ChartResult>>(
    `/api/stock-chart${toQueryString({ symbol, ...query })}`
  );

  return data.data;
};
