import type { Option } from "../types";

export function createOption(value: string, label?: string): Option {
  return {
    label: label ?? value,
    value,
  };
}

export function createOptions(
  keys: Record<string, string>,
  labels?: Record<string, string>
): Option[] {
  return Object.entries(keys).map(([key]) =>
    createOption(key, labels?.[key] ?? key)
  );
}
