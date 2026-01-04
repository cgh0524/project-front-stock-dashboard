export function createSelectOption(value: string, label?: string) {
  return {
    label: label ?? value,
    value,
  };
}
