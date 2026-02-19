import { useId, useRef, useState } from "react";

import { useOnClickOutside } from "@/shared/hooks/use-on-click-outside";
import type { Option } from "@/shared/types";

import { SelectDropdown } from "./select-dropdown";
import { SelectOption } from "./select-option";
import { SelectTrigger } from "./select-trigger";

export type SelectProps = {
  options: Option[];
  selectedOption: Option;
  onChange: (option: Option) => void;
};

export function Select({ selectedOption, options, onChange }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  const onClickTrigger = () => {
    setIsOpen(!isOpen);
  };

  const onClickOption = (option: Option) => {
    onChange(option);
    setIsOpen(false);
  };

  useOnClickOutside({
    ref: containerRef,
    onClickOutside: () => setIsOpen(false),
    enabled: isOpen,
  });

  return (
    <div
      ref={containerRef}
      role="combobox"
      aria-controls={listboxId}
      aria-expanded={isOpen}
      className="relative"
    >
      <SelectTrigger selectedOption={selectedOption} onClick={onClickTrigger} />
      {isOpen && (
        <SelectDropdown id={listboxId}>
          {options.map((option) => (
            <SelectOption
              key={option.value}
              option={option}
              selected={selectedOption?.value === option.value}
              onClick={onClickOption}
            />
          ))}
        </SelectDropdown>
      )}
    </div>
  );
}
