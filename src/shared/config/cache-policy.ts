/**
 * 캐시 정책의 단일 출처.
 * - `staleTimeMs`: React Query(`useQuery`, `prefetchQuery`)에서 사용하는 fresh 기간
 * - `revalidateSeconds`: Next.js 서버 `fetch` 캐시 재검증 주기
 */
export const CACHE_POLICY = {
  /** 실시간성이 가장 높아 1분 단위로 갱신 */
  quote: {
    revalidateSeconds: 60,
    staleTimeMs: 1000 * 60,
  },
  /** 홈 대시보드 상위 랭킹 데이터 */
  marketLeader: {
    revalidateSeconds: 60 * 10,
    staleTimeMs: 1000 * 60 * 10,
  },
  /** 섹터/산업 성과는 장중에도 빠르게 변하지만 초단위 갱신까지는 불필요 */
  marketPerformance: {
    revalidateSeconds: 60 * 10,
    staleTimeMs: 1000 * 60 * 10,
  },
  /** 뉴스 피드는 5분 단위 재검증 */
  news: {
    revalidateSeconds: 60 * 5,
    staleTimeMs: 1000 * 60 * 5,
  },
  /** 기초 재무 지표는 상대적으로 변화가 느림 */
  stockMetric: {
    revalidateSeconds: 60 * 60,
    staleTimeMs: 1000 * 60 * 60,
  },
  /** 애널리스트 추천 추세도 시간 단위 캐시로 충분 */
  recommendationTrend: {
    revalidateSeconds: 60 * 60,
    staleTimeMs: 1000 * 60 * 60,
  },
  /** 검색 입력 중 반복 호출이 많아 짧은 캐시를 유지 */
  symbolSearch: {
    revalidateSeconds: 60 * 2,
    staleTimeMs: 1000 * 60 * 2,
  },
  /** 차트는 현재 React Query 캐시만 사용하고, Next.js `fetch` 재검증은 없음 */
  stockChart: {
    staleTimeMs: 1000 * 60 * 2,
  },
} as const;
