import { type RefObject, useEffect } from "react";

type UseOnClickOutsideParams = {
  ref: RefObject<HTMLElement | null>;
  onClickOutside: () => void;
  enabled?: boolean;
};

export function useOnClickOutside({
  ref,
  onClickOutside,
  enabled = true,
}: UseOnClickOutsideParams) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handleClickOutside = (event: PointerEvent) => {
      const container = ref.current;
      if (!container) {
        return;
      }

      if (container.contains(event.target as Node)) {
        return;
      }

      onClickOutside();
    };

    document.addEventListener("pointerdown", handleClickOutside);

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [enabled, onClickOutside, ref]);
}
