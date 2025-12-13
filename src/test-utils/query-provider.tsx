import { QueryClientProvider } from "@tanstack/react-query";

import { createTestQueryClient } from "./query-client";

/**
 *
 * @example
 * ```tsx
 * import { render } from '@testing-library/react'
 * import { createWrapper } from "@/test-utils/query-provider";
 *
 * const wrapper = createWrapper();
 *
 * describe("MyComponent", () => {
 *   test("should render", () => {
 *     render(<MyComponent />, { wrapper });
 *     expect(screen.getByText("MyComponent")).toBeInTheDocument();
 *   });
 * });
 */
export function createWrapper() {
  const queryClient = createTestQueryClient();

  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
}
