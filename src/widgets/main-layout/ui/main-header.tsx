import { SearchSymbolBar } from "@/features/search-symbol";

type MainHeaderProps = {
  onOpenNavigation: () => void;
};

export function MainHeader({ onOpenNavigation }: MainHeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 w-full bg-surface-default p-2 shadow-[0_6px_12px_-6px_rgba(0,0,0,0.25)]">
      <button
        type="button"
        aria-label="Open navigation menu"
        className="flex h-10 w-10 items-center justify-center rounded-md border border-border-default md:hidden"
        onClick={onOpenNavigation}
      >
        <span className="text-xl leading-none">≡</span>
      </button>

      <div className="flex-1 flex justify-end">
        <SearchSymbolBar />
      </div>
    </header>
  );
}
