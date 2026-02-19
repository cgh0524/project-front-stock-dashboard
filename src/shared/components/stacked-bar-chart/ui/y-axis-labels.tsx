type YAxisLabelsProps = {
  ticks: number[];
  yTickCount: number;
};

export function YAxisLabels({ ticks, yTickCount }: YAxisLabelsProps) {
  return (
    <div className="w-10 h-full relative text-xs text-text-secondary">
      {ticks.map((tick, index) => {
        const position = `${(index / yTickCount) * 100}%`;
        return (
          <span
            key={`${tick}-${index}`}
            className="absolute right-0 -translate-y-1/2"
            style={{ top: position }}
          >
            {tick}
          </span>
        );
      })}
    </div>
  );
}
