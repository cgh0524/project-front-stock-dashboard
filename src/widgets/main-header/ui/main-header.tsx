import { SearchSymbolBar } from "@/features/search-symbol";

export function MainHeader() {
  return (
    <header className="fixed top-0 z-10 h-[56px] flex items-center justify-end w-full bg-surface-default border-border-default border-solid border p-2 ">
      <SearchSymbolBar />
    </header>
  );
}
