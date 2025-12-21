import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import React from "react";

import type { Symbol } from "@/entities/stock";

import { SearchResultList } from "./search-result-list";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a {...props}>{children}</a>
  ),
}));

const createSymbol = (overrides: Partial<Symbol> = {}): Symbol => ({
  description: "Test Corp",
  displaySymbol: "TEST",
  symbol: "TEST",
  type: "Common Stock",
  ...overrides,
});

describe("SearchResultList", () => {
  it("심볼이 없고 로딩 중이면 스피너를 표시한다", () => {
    render(<SearchResultList loading symbols={[]} error={null} />);

    expect(screen.getByText("Searching for stocks...")).toBeInTheDocument();
  });

  it("에러가 전달되면 에러 메시지를 보여준다", () => {
    const error = new Error("Failed to fetch");

    render(<SearchResultList loading={false} symbols={[]} error={error} />);

    expect(screen.getByText("Failed to fetch")).toBeInTheDocument();
  });

  it("심볼이 없으면 빈 상태를 렌더링한다", () => {
    render(<SearchResultList loading={false} symbols={[]} error={null} />);

    expect(screen.getByText("No symbols found.")).toBeInTheDocument();
  });

  it("심볼이 있으면 리스트를 렌더링한다", () => {
    const symbols = [
      createSymbol({
        symbol: "AAPL",
        displaySymbol: "AAPL",
        description: "Apple Inc.",
      }),
      createSymbol({
        symbol: "MSFT",
        displaySymbol: "MSFT",
        description: "Microsoft Corporation",
      }),
    ];

    render(<SearchResultList loading={false} symbols={symbols} error={null} />);

    expect(screen.getByText("AAPL")).toBeInTheDocument();
    expect(screen.getByText("MSFT")).toBeInTheDocument();
    expect(screen.getByText("Apple Inc.")).toBeInTheDocument();
    expect(screen.getByText("Microsoft Corporation")).toBeInTheDocument();
  });
});
