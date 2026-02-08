import { useEffect, useState } from "react";

/**
 * @description 입력값을 디바운스하여 반환하는 훅
 * @example
 * ```ts
 * const [searchKeyword, setSearchKeyword] = useState("");
 * const debouncedSearchKeyword = useDebouncedValue(searchKeyword, 300);
 * ```
 */
export const useDebouncedValue = <T>(value: T, delay: number = 300): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};
