import type { Option } from "@/shared/types";

export type SelectOptionProps = {
  option: Option;
  selected: boolean;
  onClick: (option: Option) => void;
};

export function SelectOption({ option, selected, onClick }: SelectOptionProps) {
  return (
    <li
      role="option"
      aria-selected={selected}
      className="w-full overflow-hidden"
    >
      <button
        className="w-full px-2 py-1 text-left hover:bg-accent-hover"
        type="button"
        onClick={() => onClick(option)}
      >
        <span>{option.label}</span>
      </button>
    </li>
  );
}
