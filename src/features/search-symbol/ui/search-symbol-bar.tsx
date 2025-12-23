"use client";

import { useRef } from "react";

import { useSearchSymbols } from "@/entities/symbol";

import { useSearchInput } from "../lib";
import { SearchInput } from "./search-input";
import { SearchResultList } from "./search-result-list";

export function SearchSymbolBar() {
  const { searchKeyword, setSearchKeyword, debouncedSearchKeyword, canSearch } =
    useSearchInput();
  const containerRef = useRef<HTMLDivElement>(null);

  const shouldShowSearchResult = searchKeyword.length >= 2;

  const {
    data: symbols,
    isLoading,
    error,
  } = useSearchSymbols({ query: debouncedSearchKeyword, enabled: canSearch });

  const onChangeSearchKeyword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchKeyword(event.target.value);
  };

  return (
    <div ref={containerRef} className="relative max-w-md min-w-2xs ">
      <SearchInput value={searchKeyword} onChange={onChangeSearchKeyword} />

      {shouldShowSearchResult && (
        <SearchResultList
          loading={isLoading}
          error={error}
          symbols={symbols ?? []}
        />
      )}
    </div>
  );
}
