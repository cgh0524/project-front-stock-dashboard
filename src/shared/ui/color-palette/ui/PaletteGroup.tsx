import type { SwatchGroup } from "@/shared/lib/design-tokens/types";

import { SwatchCard } from "./SwatchCard";

type PaletteGroupProps = SwatchGroup;

export function PaletteGroup({ title, tokens }: PaletteGroupProps) {
  const paletteGridClass =
    "grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4";

  return (
    <section className="space-y-4">
      <header>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-text-muted">
          {title}
        </h3>
      </header>
      <div className={paletteGridClass}>
        {tokens.map((swatch) => (
          <SwatchCard key={swatch.label} {...swatch} />
        ))}
      </div>
    </section>
  );
}
