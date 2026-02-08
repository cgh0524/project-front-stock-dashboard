import type { LogicalRange } from "lightweight-charts";
import { useCallback, useRef } from "react";

import { useThrottleFn } from "@/shared/lib/hooks/use-throttle-fn";

export type UseInfiniteChartScrollParams = {
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  threshold?: number;
  throttleMs?: number;
};

export function useInfiniteChartScroll({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  threshold = 5,
  throttleMs = 500,
}: UseInfiniteChartScrollParams) {
  /** 이전 range.from 값 (임계값 crossing 판단용) */
  const prevRangeFromRef = useRef<number | null>(null);

  const throttledFetchNextPage = useThrottleFn(() => {
    fetchNextPage();
  }, throttleMs);

  /** 차트의 뷰포트 범위 변경 시, 실행 */
  const handleVisibleRangeChange = useCallback(
    (range: LogicalRange | null) => {
      if (!range || !hasNextPage || isFetchingNextPage) return;

      const prevFrom = prevRangeFromRef.current;
      const isCrossing = prevFrom === null || (prevFrom >= threshold && range.from < threshold);
      const isFarLeft = range.from < threshold;
      prevRangeFromRef.current = range.from;

      if (!isCrossing && !isFarLeft) return;

      throttledFetchNextPage();
    },
    [hasNextPage, isFetchingNextPage, threshold, throttledFetchNextPage]
  );

  return { onVisibleRangeChange: handleVisibleRangeChange };
}
