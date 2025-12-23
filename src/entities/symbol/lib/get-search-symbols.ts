import { axiosClient } from "@/shared/api/axios";
import type { BffSuccess } from "@/shared/api/bff-success";

import type { Symbol } from "../model/symbol";

export const getSearchSymbols = async (query: string): Promise<Symbol[]> => {
  const { data } = await axiosClient.get<BffSuccess<Symbol[]>>(
    `/api/search-symbol?symbol=${query}`
  );

  return data.data;
};
