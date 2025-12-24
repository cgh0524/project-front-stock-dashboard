import type { ApiSuccess } from "@/shared/api/api-success";
import { axiosClient } from "@/shared/api/axios";

import type { Symbol } from "../model/symbol";

export const getSearchSymbols = async (symbol: string): Promise<Symbol[]> => {
  const { data } = await axiosClient.get<ApiSuccess<Symbol[]>>(
    `/api/search-symbol?symbol=${symbol}`
  );

  return data.data;
};
