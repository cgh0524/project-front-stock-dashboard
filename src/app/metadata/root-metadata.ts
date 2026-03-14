import type { Metadata } from "next";

import {
  APP_NAME,
  METADATA_DESCRIPTION,
  ROOT_METADATA_KEYWORDS,
  SITE_URL,
} from "./constant";

/** 절대 URL이 필요한 Open Graph/canonical 계산용 base URL */
export const getMetadataBase = () => {
  try {
    return new URL(SITE_URL);
  } catch {
    return new URL(SITE_URL);
  }
};

/** 루트 레이아웃 메타 생성기 */
export const getRootMetadata = ({
  canonicalPath,
}: {
  canonicalPath: string;
}): Metadata => ({
  metadataBase: getMetadataBase(),
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: METADATA_DESCRIPTION,
  applicationName: APP_NAME,
  keywords: [...ROOT_METADATA_KEYWORDS],
  alternates: {
    canonical: canonicalPath,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: APP_NAME,
    title: APP_NAME,
    description: METADATA_DESCRIPTION,
    url: canonicalPath,
  },
  twitter: {
    card: "summary_large_image",
    title: APP_NAME,
    description: METADATA_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
});
