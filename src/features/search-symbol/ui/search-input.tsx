import SearchIcon from "@/shared/ui/icon/search.svg";
import { Input } from "@/shared/ui/input";

export type SearchInputProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
};

export function SearchInput({ value, onChange, onFocus }: SearchInputProps) {
  return (
    <div className="relative">
      <Input
        placeholder="Search for a stock"
        value={value}
        onChange={onChange}
        onFocus={onFocus}
      />

      <SearchIcon
        className="absolute right-2 top-1/2 -translate-y-1/2"
        aria-hidden="true"
        width={18}
        height={18}
      />
    </div>
  );
}
