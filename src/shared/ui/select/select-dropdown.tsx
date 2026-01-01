export type SelectDropdownProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export function SelectDropdown({ children, id }: SelectDropdownProps) {
  return (
    <div
      id={id}
      role="listbox"
      className="absolute top-full left-0 w-full max-h-96 overflow-y-auto bg-surface-default border border-border-default rounded-md"
    >
      {children}
    </div>
  );
}
