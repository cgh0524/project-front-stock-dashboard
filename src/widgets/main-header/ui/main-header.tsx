import { SearchSymbolBar } from "@/features/search-symbol";

export function MainHeader() {
  return (
    <header className="sticky top-0 z-10 flex justify-end w-full bg-surface-default border-border-default border-solid border p-2 ">
      <SearchSymbolBar />
    </header>
  );
}
