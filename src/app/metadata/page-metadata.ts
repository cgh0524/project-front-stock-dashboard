import type { Metadata } from "next";

import {
  METADATA_PAGE_NAME,
  type MetadataPageName,
} from "./constant";

type PageMetadataInput = {
  title: string;
  description: string;
};

/** 정적 페이지 메타를 같은 형태로 생성하기 위한 팩토리 */
export const createPageMetaData = ({
  title,
  description,
}: PageMetadataInput): Metadata => ({
  title,
  description,
});

/** 종목 상세 페이지 메타 생성기 */
const getStockDetailMetadata = (symbol?: string) => {
  const normalizedSymbol = symbol?.toUpperCase();
  const title = normalizedSymbol ? `${normalizedSymbol} Stock Detail` : "Stock Detail";
  const description = normalizedSymbol
    ? `Price, chart, financial metrics, and analyst recommendation trends for ${normalizedSymbol}.`
    : "Price, chart, financial metrics, and analyst recommendation trends for the stock.";

  return createPageMetaData({
    title,
    description,
  });
};

const PAGE_METADATA = {
  [METADATA_PAGE_NAME.STOCK_DASHBOARD]: createPageMetaData({
    title: "Stock Dashboard",
    description:
      "Dashboard for tracking key indices, sector performance, and top market leaders in one view.",
  }),
  [METADATA_PAGE_NAME.MARKET_NEWS]: createPageMetaData({
    title: "Market News",
    description: "Explore category-based market news with infinite scrolling.",
  }),
} as const;

/** 페이지 메타를 키 기반으로 일관되게 조회하는 단일 진입점 */
export function getPageMetaData(
  page: typeof METADATA_PAGE_NAME.STOCK_DASHBOARD
): Metadata;
export function getPageMetaData(
  page: typeof METADATA_PAGE_NAME.MARKET_NEWS
): Metadata;
export function getPageMetaData(
  page: typeof METADATA_PAGE_NAME.STOCK_DETAIL,
  symbol: string
): Metadata;
export function getPageMetaData(
  page: MetadataPageName,
  symbol?: string
): Metadata {
  if (page === METADATA_PAGE_NAME.STOCK_DETAIL) {
    return getStockDetailMetadata(symbol);
  }

  return PAGE_METADATA[page];
}
