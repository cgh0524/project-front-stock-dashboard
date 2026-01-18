import Link from "next/link";

import type { Symbol } from "@/entities/symbol";

export type SearchResultItemProps = {
  symbol: Symbol;
};

export function SearchResultItem({ symbol }: SearchResultItemProps) {
  return (
    <div className="flex items-center gap-2 w-full p-2 cursor-pointer hover:bg-surface-alt rounded-sm">
      <div className="text-sm font-bold">{symbol.displaySymbol}</div>
      <div className="text-sm text-text-secondary">{symbol.description}</div>
    </div>
  );
}
