import type { Option } from "@/shared/types";
import DropdownArrow from "@/shared/ui/icon/dropdown-arrow.svg";

export type SelectTriggerProps = {
  selectedOption?: Option;
  placeholder?: string;
  onClick: () => void;
};

export function SelectTrigger({
  selectedOption,
  placeholder = "Select an option",
  onClick,
}: SelectTriggerProps) {
  return (
    <div className="relative min-w-24 md:min-w-28 border-border-default border-solid border py-1 rounded-md font outline-none focus:border-border-strong text-sm md:text-base">
      <button
        className="flex items-center justify-between w-full cursor-pointer"
        type="button"
        onClick={onClick}
      >
        <span className="text-text-primary px-2 font-bold">
          {selectedOption?.label ?? placeholder}
        </span>

        <DropdownArrow className="w-8 h-8 mb-[-2px]" />
      </button>
    </div>
  );
}

export function SearchableSelectTrigger() {
  return <input type="text" />;
}
