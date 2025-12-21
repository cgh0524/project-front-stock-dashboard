import Link from "next/link";
import { useRouter } from "next/navigation";

import type { Symbol } from "@/entities/stock";

export type SearchResultItemProps = {
  symbol: Symbol;
};

export function SearchResultItem({ symbol }: SearchResultItemProps) {
  return (
    <Link
      href={`/stock-dashboard/${symbol.symbol}`}
      className="w-full inline-block p-2 cursor-pointer hover:bg-surface-alt rounded-sm"
    >
      <div className="flex items-center gap-2">
        <div className="text-sm font-bold">{symbol.displaySymbol}</div>
        <div className="text-sm text-text-secondary">{symbol.description}</div>
      </div>
    </Link>
  );
}
