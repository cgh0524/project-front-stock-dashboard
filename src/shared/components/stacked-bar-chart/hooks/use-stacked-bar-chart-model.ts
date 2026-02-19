import type { StackedBarChartItem, StackedBarChartSeries } from "../types";

/** 카테고리별 누적 합계(막대 전체 높이) 계산 */
function getTotal(item: StackedBarChartItem, keys: string[]): number {
  return keys.reduce((acc, key) => acc + (item.values[key] ?? 0), 0);
}

/** 
 * @description 차트 데이터 모델링 훅 
 * @param data 차트 데이터
 * @param series 차트 시리즈
 * @param yTickCount Y축 눈금 개수
 * @returns 차트 데이터 모델
 */
export function useStackedBarChartModel(
  data: StackedBarChartItem[],
  series: StackedBarChartSeries[],
  yTickCount: number
) {
  /** 시리즈 키 목록 */
  const keys = series.map((item) => item.key);

  /** 카테고리별 누적 합계(막대 전체 높이) */
  const totals = data.map((item) => getTotal(item, keys));

  /** Y축 스케일 기준이 되는 최대 누적값(0 나눗셈 방지용 최소 1) */
  const maxTotal = Math.max(1, ...totals);
  
  /** 최대값 기준으로 균등 분할한 Y축 눈금 라벨 값 */
  const ticks = Array.from({ length: yTickCount + 1 }, (_, index) => {
    const ratio = index / yTickCount;
    return Math.round(maxTotal * (1 - ratio));
  });

  return {
    maxTotal,
    ticks,
  };
}
