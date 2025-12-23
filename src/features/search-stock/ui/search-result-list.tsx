import type { Symbol } from "@/entities/symbol";
import { EmptyContent } from "@/shared/ui/fallback/empty-content";
import { LoadingSpinner } from "@/shared/ui/fallback/loading-spinner";

import { SearchResultItem } from ".";

export type SearchResultListProps = {
  symbols: Symbol[];
  loading: boolean;
  error: Error | null;
};

export function SearchResultList({
  loading,
  error,
  symbols,
}: SearchResultListProps) {
  const defaultStyles =
    "absolute w-full max-h-96 p-2 overflow-y-auto bg-surface-default border-border-default border-solid border rounded-md shadow-lg drop-shadow-lg";

  if (loading && symbols.length === 0) {
    return (
      <div className={`${defaultStyles} py-4`}>
        <LoadingSpinner message="Searching for stocks..." />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`${defaultStyles} py-4 text-center text-negative font-bold bg-surface-alt`}
      >
        <span className="text-text-negative font-bold">{error.message}</span>
      </div>
    );
  }

  if (symbols.length === 0) {
    return (
      <div className={`${defaultStyles} py-4`}>
        <EmptyContent message="No symbols found." />
      </div>
    );
  }

  return (
    <div className={defaultStyles}>
      <ul className="list-none">
        {symbols.map((item, index) => (
          <li key={`${item.displaySymbol}-${index}`}>
            <SearchResultItem symbol={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
