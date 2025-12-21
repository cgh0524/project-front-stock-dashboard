import { StockSearchBar } from "@/widgets/stock-search-bar";

export function MainHeader() {
  return (
    <header className="flex justify-end w-full bg-surface-default border-border-default border-solid border p-2 ">
      <StockSearchBar />
    </header>
  );
}
