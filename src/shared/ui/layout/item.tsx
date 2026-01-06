export type ItemProps = {
  children: React.ReactNode;
};

export function Item({ children }: ItemProps) {
  return (
    <div
      className={
        "flex flex-col gap-2 min-w-12 p-4 bg-surface-default rounded-lg border border-border-default shadow-sm"
      }
    >
      {children}
    </div>
  );
}
