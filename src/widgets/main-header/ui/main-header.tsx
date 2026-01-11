import { SearchSymbolBar } from "@/features/search-symbol";

export function MainHeader() {
  return (
    <header className="relative z-10 flex items-center justify-end w-full bg-surface-default p-2 shadow-[0_6px_12px_-6px_rgba(0,0,0,0.25)]">
      <SearchSymbolBar />
    </header>
  );
}
