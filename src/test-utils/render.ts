import { render } from "@testing-library/react";

import { createWrapper } from "./query-provider";

/**
 *
 * @example
 * ```tsx
 * import { renderWithProviders } from "@/test-utils/render";
 *
 * const { screen } = renderWithProviders(<MyComponent />);
 */
export function renderWithProviders(ui: React.ReactElement) {
  return render(ui, { wrapper: createWrapper() });
}
