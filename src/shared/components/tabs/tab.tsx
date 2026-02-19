import type { Option } from "@/shared/types";

export type TabProps = {
  option: Option;
  selected: boolean;
  onClick: (tab: Option) => void;
};

export const Tab = ({ option, selected, onClick }: TabProps) => {
  const selectedStyles = "bg-surface-alt text-accent-primary-foreground";
  const unselectedStyles = "bg-surface-default text-text-muted";

  const styles = selected ? selectedStyles : unselectedStyles;

  return (
    <button
      type="button"
      className={`flex-1 px-4 py-2 rounded-md text-base font-bold cursor-pointer hover:bg-surface-alt ${styles}`}
      onClick={() => onClick(option)}
    >
      {option.label}
    </button>
  );
};
