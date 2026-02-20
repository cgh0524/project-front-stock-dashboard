const DEFAULT_APP_NAME = "Market Watch";
const DEFAULT_BASE_PATH = "/stock-dashboard";
const DEFAULT_SITE_URL = "http://localhost:3000";
const DEFAULT_DESCRIPTION =
  "Portfolio stock dashboard built with Next.js and React, featuring FSD architecture, BFF APIs";

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? DEFAULT_APP_NAME;
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? DEFAULT_BASE_PATH;
export const METADATA_DESCRIPTION =
  process.env.NEXT_PUBLIC_METADATA_DESCRIPTION ?? DEFAULT_DESCRIPTION;

export const getMetadataBase = () => {
  try {
    return new URL(process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL);
  } catch {
    return new URL(DEFAULT_SITE_URL);
  }
};
