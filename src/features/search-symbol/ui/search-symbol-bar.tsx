"use client";

import { useRef, useState } from "react";

import { useSearchSymbolsQuery } from "@/entities/symbol";
import { useOnClickOutside } from "@/shared/hooks/use-on-click-outside";

import { useSearchInput } from "../lib";
import { SearchInput } from "./search-input";
import { SearchResultList } from "./search-result-list";

export function SearchSymbolBar() {
  const { searchKeyword, setSearchKeyword, debouncedSearchKeyword, canSearch } =
    useSearchInput();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const shouldShowSearchResult = isOpen && searchKeyword.length >= 2;

  const {
    data: symbols,
    isLoading,
    error,
  } = useSearchSymbolsQuery({
    query: debouncedSearchKeyword,
    enabled: canSearch,
  });

  const onChangeSearchKeyword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchKeyword(event.target.value);
    setIsOpen(true);
  };

  const onFocusSearchInput = () => {
    setIsOpen(true);
  };

  const onSelectSymbol = () => {
    setIsOpen(false);
  }

  useOnClickOutside({
    ref: containerRef,
    onClickOutside: () => setIsOpen(false),
    enabled: isOpen,
  });

  return (
    <div ref={containerRef} className="relative max-w-md w-full sm:min-w-2xs">
      <SearchInput
        value={searchKeyword}
        onChange={onChangeSearchKeyword}
        onFocus={onFocusSearchInput}
      />

      {shouldShowSearchResult && (
        <SearchResultList
          loading={isLoading}
          error={error}
          symbols={symbols ?? []}
          onSelectSymbol={onSelectSymbol}
        />
      )}
    </div>
  );
}
