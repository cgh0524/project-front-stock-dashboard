const DEFAULT_APP_NAME = "Market Watch";
const DEFAULT_SITE_URL = "https://stock-watch-v1.vercel.app";
const DEFAULT_DESCRIPTION =
  "Portfolio stock dashboard built with Next.js and React, featuring FSD architecture, BFF APIs";

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? DEFAULT_APP_NAME;
export const METADATA_DESCRIPTION =
  process.env.NEXT_PUBLIC_METADATA_DESCRIPTION ?? DEFAULT_DESCRIPTION;

export const getMetadataBase = () => {
  try {
    return new URL(process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL);
  } catch {
    return new URL(DEFAULT_SITE_URL);
  }
};
