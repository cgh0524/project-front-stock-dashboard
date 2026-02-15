import type { LogicalRange } from "lightweight-charts";
import { useCallback, useEffect, useRef } from "react";

import { useThrottleFn } from "@/shared/hooks/use-throttle-fn";

export type UseInfiniteChartScrollParams = {
  /** 다음 과거 구간 데이터를 요청하는 함수 */
  fetchPreviousData: () => void;
  /** 추가로 불러올 페이지가 있는지 여부 */
  hasMorePreviousData: boolean | undefined;
  /** 다음 페이지를 현재 요청 중인지 여부 */
  isFetchingPreviousData: boolean;
  /** 현재 로드된 차트 데이터 개수 (예: data.length) */
  loadedDataCount?: number;
  /** 차트 왼쪽 여백(빈 영역) 대응 fetch 트리거 임계값(논리 bar 인덱스) */
  leftGapThreshold?: number;
  /** fetch 트리거 최소 간격(ms) */
  throttleMs?: number;
};

/** 
 * @description 차트 좌우 스크롤에 따라, 차트 데이터 추가 요청
 * @param fetchPreviousData 다음 과거 구간 데이터를 요청하는 함수
 * @param hasMorePreviousData 추가로 불러올 페이지가 있는지 여부
 * @param isFetchingPreviousData 다음 페이지를 현재 요청 중인지 여부
 * @param loadedDataCount 현재 로드된 차트 데이터 개수 (예: data.length)
 * @param leftGapThreshold 차트 왼쪽 여백(빈 영역) 대응 fetch 트리거 임계값(논리 bar 인덱스)
 * @param throttleMs fetch 트리거 최소 간격(ms) 
 * @returns onVisibleRangeChange 차트의 뷰포트 범위 변경 시, 실행하는 함수
 */
export function useInfiniteChartScroll({
  fetchPreviousData,
  hasMorePreviousData,
  isFetchingPreviousData,
  loadedDataCount,
  leftGapThreshold = 0,
  throttleMs = 300,
}: UseInfiniteChartScrollParams) {
  /** 마지막 visible range */
  const latestVisibleRangeRef = useRef<LogicalRange | null>(null);

  const throttledFetchPreviousData = useThrottleFn(() => {
    fetchPreviousData();
  }, throttleMs);

  const triggerFetchIfLeftGapRemains = useCallback(() => {
    if (!hasMorePreviousData || isFetchingPreviousData) return;

    const latestRange = latestVisibleRangeRef.current;
    if (!latestRange) return;
    if (latestRange.from >= leftGapThreshold) return;
    
    throttledFetchPreviousData();
  }, [hasMorePreviousData, isFetchingPreviousData, leftGapThreshold, throttledFetchPreviousData]);

  /** 차트의 뷰포트 범위 변경 시, 실행 */
  const handleVisibleRangeChange = useCallback(
    (range: LogicalRange | null) => {
      latestVisibleRangeRef.current = range;
      triggerFetchIfLeftGapRemains();
    },
    [triggerFetchIfLeftGapRemains]
  );

  /** 데이터가 갱신된 뒤에도 좌측 빈 영역이 남아있으면 이어서 추가 요청 */
  useEffect(() => {
    triggerFetchIfLeftGapRemains();
  }, [loadedDataCount, triggerFetchIfLeftGapRemains]);

  return { onVisibleRangeChange: handleVisibleRangeChange };
}
