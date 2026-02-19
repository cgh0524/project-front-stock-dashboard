import { PaletteGroup } from "@/shared/components/color-palette/palette-group";
import {
  primitivePaletteGroups,
  semanticPaletteGroups,
} from "@/shared/design-tokens";

/**
 * 이 페이지는 프로젝트에 사용되는 디자인 토큰을 확인하기 위한 페이지이며,
 * 디자인 토큰이 변경되기 전까지 리렌더링이 필요하지 않음.
 * 따라서 static generation 강제 설정과 ISR 비활성화.
 */

export const dynamic = "force-static";
export const revalidate = false;

export default function Palette() {
  return (
    <div className="mx-auto max-w-6xl space-y-16 px-6 py-12">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.24em] text-text-secondary">
          Color System
        </p>
        <h1 className="text-4xl font-semibold text-text-primary">
          Design Tokens Playground
        </h1>
        <p className="max-w-3xl text-base text-text-primary">
          Explore the primitive scales and semantic roles defined in{" "}
          <code className="font-mono">tailwind.config.ts</code>. Each tile shows
          the underlying CSS variable so you can reference it in components and
          documentation.
        </p>
      </header>

      <section className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-text-primary">
            Primitive Colors
          </h2>
          <p className="text-sm text-text-primary">
            Base hues that power the system. Use these for charts,
            illustrations, and when crafting new semantic roles.
          </p>
        </div>
        <div className="space-y-8">
          {primitivePaletteGroups.map((group) => (
            <PaletteGroup key={group.title} {...group} />
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-text-primary">
            Semantic Colors
          </h2>
          <p className="text-sm text-text-primary">
            Contextual tokens used throughout the UI. Pair these with primitives
            when extending states or building new patterns.
          </p>
        </div>
        <div className="space-y-8">
          {semanticPaletteGroups.map((group) => (
            <PaletteGroup key={group.title} {...group} />
          ))}
        </div>
      </section>
    </div>
  );
}
