import type { Option } from "../types";

export function createOption(value: string, label?: string): Option {
  return {
    label: label ?? value,
    value,
  };
}

export function createOptions(obj: Record<string, string>): Option[] {
  return Object.entries(obj).map(([key, value]) => createOption(key, value));
}
