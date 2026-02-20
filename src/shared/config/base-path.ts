const DEFAULT_BASE_PATH = "/stock-dashboard";

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? DEFAULT_BASE_PATH;

export const withBasePath = (href: string) =>
  href === "/" ? BASE_PATH : `${BASE_PATH}${href}`;

export const isMatchedPath = (pathname: string, href: string) =>
  pathname === href || pathname === withBasePath(href);
