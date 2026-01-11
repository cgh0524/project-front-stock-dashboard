export type ItemProps = {
  children: React.ReactNode;
};

export function Item({ children }: ItemProps) {
  return (
    <div
      className={
        "flex flex-col justify-between gap-2 min-w-12 min-h-[100px] p-4 bg-surface-default rounded-lg border border-border-default shadow-sm"
      }
    >
      {children}
    </div>
  );
}
