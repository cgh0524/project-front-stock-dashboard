import type { Swatch } from "@/shared/lib/design-tokens/types";

type SwatchCardProps = Swatch;

export function SwatchCard({ label, token }: SwatchCardProps) {
  const cssVariable = `var(${token})`;

  return (
    <div
      className="relative aspect-square overflow-hidden rounded-xl border border-black/10 shadow-sm"
      style={{ backgroundColor: cssVariable }}
    >
      <div className="absolute inset-0 flex flex-col justify-end p-3">
        <div className="rounded-md bg-neutral-950/65 px-3 py-2 text-xs text-white backdrop-blur-sm">
          <div className="font-medium">{label}</div>
          <div className="mt-1 font-mono text-[11px]">{cssVariable}</div>
        </div>
      </div>
    </div>
  );
}
