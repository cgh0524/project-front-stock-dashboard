import { useCallback, useEffect, useRef } from "react";

type UseInfiniteScrollObserverParams = {
  rootRef: React.RefObject<HTMLElement | null>;
  targetRef: React.RefObject<HTMLElement | null>;
  enabled: boolean;
  onIntersect: () => void;
  requireUserScroll?: boolean;
  rootMargin?: string;
  threshold?: number;
  scrollTopThreshold?: number;
};

export function useInfiniteScrollObserver({
  rootRef,
  targetRef,
  enabled,
  onIntersect,
  requireUserScroll = false,
  rootMargin = "300px 0px",
  threshold = 0.01,
  scrollTopThreshold = 0,
}: UseInfiniteScrollObserverParams) {
  const hasUserScrolledRef = useRef(false);

  const handleRootScroll = useCallback(
    (event: React.UIEvent<HTMLElement>) => {
      if (!requireUserScroll) return;
      if (event.currentTarget.scrollTop > scrollTopThreshold) {
        hasUserScrolledRef.current = true;
      }
    },
    [requireUserScroll, scrollTopThreshold]
  );

  useEffect(() => {
    const target = targetRef.current;
    const root = rootRef.current;

    if (!enabled || !target || !root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries[0]?.isIntersecting;
        if (!isVisible) return;
        if (requireUserScroll && !hasUserScrolledRef.current) return;
        onIntersect();
      },
      {
        root,
        rootMargin,
        threshold,
      }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [enabled, onIntersect, requireUserScroll, rootMargin, rootRef, targetRef, threshold]);

  return {
    onRootScroll: handleRootScroll,
  };
}
