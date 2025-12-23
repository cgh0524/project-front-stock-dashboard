import { axiosClient } from "@/shared/api/axios";
import type { BffSuccess } from "@/shared/api/bff-success";

import type { Symbol } from "../model/symbol";

export const getSearchSymbols = async (symbol: string): Promise<Symbol[]> => {
  const { data } = await axiosClient.get<BffSuccess<Symbol[]>>(
    `/api/search-symbol?symbol=${symbol}`
  );

  return data.data;
};
