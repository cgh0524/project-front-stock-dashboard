import dayjs from "dayjs";
import { useCallback, useRef } from "react";

export function useThrottleFn<T extends (...args: unknown[]) => void>(
  fn: T,
  delayMs: number
) {
  const lastCallRef = useRef<number>(0);

  return useCallback(
    (...args: Parameters<T>) => {
      const now = dayjs().valueOf();
      if (now - lastCallRef.current < delayMs) return;
      lastCallRef.current = now;
      fn(...args);
    },
    [fn, delayMs]
  );
}
