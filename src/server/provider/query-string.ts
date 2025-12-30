export type QueryValue = string | number | boolean | null | undefined;

export function toQueryString<T extends object>(query: {
  [K in keyof T]: QueryValue;
}): string {
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    params.append(key, String(value));
  });

  const qs = params.toString();
  return qs ? `?${qs}` : "";
}
