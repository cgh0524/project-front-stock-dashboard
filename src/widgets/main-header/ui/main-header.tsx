import { SearchSymbolBar } from "@/features/search-symbol";

export function MainHeader() {
  return (
    <header className="flex justify-end w-full bg-surface-default border-border-default border-solid border p-2 ">
      <SearchSymbolBar />
    </header>
  );
}
