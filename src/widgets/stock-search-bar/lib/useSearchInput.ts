import { useState } from "react";

import { useDebouncedValue } from "@/shared/lib/hooks/useDebounceValue";

export const useSearchInput = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const debouncedSearchKeyword = useDebouncedValue(searchKeyword, 450);

  const canSearch = searchKeyword.length > 2;

  return { searchKeyword, setSearchKeyword, canSearch, debouncedSearchKeyword };
};
