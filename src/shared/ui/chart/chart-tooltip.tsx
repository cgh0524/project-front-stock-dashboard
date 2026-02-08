export type ChartTooltipItem = {
  label: string;
  value: string;
};

export type ChartTooltipProps = {
  open: boolean;
  x: number;
  y: number;
  items: ChartTooltipItem[];
};

export function ChartTooltip({ open, x, y, items }: ChartTooltipProps) {
  if (!open) return null;

  return (
    <div
      className="pointer-events-none absolute z-10 rounded-md border border-border-default bg-surface-default px-3 py-2 text-xs text-text-primary shadow"
      style={{
        transform: "translate(8px, -8px)",
        left: x,
        top: y,
      }}
    >
      <div className="flex flex-col gap-1">
        {items.map((item) => (
          <div key={item.label} className="flex justify-between gap-2">
            <span className="text-text-secondary">{item.label}</span>
            <span className="font-bold">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
