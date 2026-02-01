import type { IChartApi, LogicalRange } from "lightweight-charts";
import { useCallback, useEffect, useRef } from "react";

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
  /** 차트 인스턴스 */
  const chartRef = useRef<IChartApi | null>(null);
  /** range 구독 해제 함수 */
  const unsubscribeRef = useRef<(() => void) | null>(null);
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

  useEffect(() => {
    return () => {
      unsubscribeRef.current?.();
      unsubscribeRef.current = null;
    };
  }, []);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;
    const timeScale = chart.timeScale();
    // 최신 콜백을 반영하기 위해 재구독
    unsubscribeRef.current?.();
    timeScale.subscribeVisibleLogicalRangeChange(handleVisibleRangeChange);
    unsubscribeRef.current = () => {
      timeScale.unsubscribeVisibleLogicalRangeChange(handleVisibleRangeChange);
    };
  }, [handleVisibleRangeChange]);

  const onReady = useCallback(
    ({ chart }: { chart: IChartApi }) => {
      chartRef.current = chart;
      const timeScale = chart.timeScale();
      timeScale.subscribeVisibleLogicalRangeChange(handleVisibleRangeChange);
      unsubscribeRef.current = () => {
        timeScale.unsubscribeVisibleLogicalRangeChange(handleVisibleRangeChange);
      };
    },
    [handleVisibleRangeChange]
  );

  return { onReady };
}
