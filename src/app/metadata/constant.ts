/** 앱 이름 */
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Stock Watch";

/** 메타데이터 기본 사이트 URL */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://stock-watch-v1.vercel.app";

/** 메타데이터 설명 */
export const METADATA_DESCRIPTION =
process.env.NEXT_PUBLIC_METADATA_DESCRIPTION || "Portfolio stock dashboard built with Next.js and React, featuring FSD architecture, BFF APIs";

/** 메타데이터 정의된 페이지 이름 */
export const METADATA_PAGE_NAME = {
  STOCK_DASHBOARD: "stockDashboard",
  MARKET_NEWS: "marketNews",
  STOCK_DETAIL: "stockDetail",
} as const;

/** 메타데이터 정의된 페이지 이름 타입 */
export type MetadataPageName =
  (typeof METADATA_PAGE_NAME)[keyof typeof METADATA_PAGE_NAME];

/** 루트 메타데이터 키워드 */
export const ROOT_METADATA_KEYWORDS = [
  "Next.js",
  "React",
  "TypeScript",
  "React Query",
  "FSD",
  "BFF",
  "DIP",
  "Stock Dashboard",
  "Portfolio",
] as const;
