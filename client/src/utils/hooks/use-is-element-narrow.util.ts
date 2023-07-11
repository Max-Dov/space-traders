import { RefObject, useEffect, useState } from 'react';

/**
 * Returns true if element is narrower than given widthValue. Re-calculates on window resize.
 * Returns true by default. That hook is useful for making panels layout more adaptable for
 * available space on screen.
 */
export const useIsElementNarrow = (elementRef: RefObject<HTMLElement> | null, maxNarrowWidth: number): boolean => {
  const [isElementNarrow, setIsElementNarrow] = useState(true);
  const [observer, setObserver] = useState<ResizeObserver | null>(null);

  /**
   * Re-instantiate observer if maxNarrowWidth changes.
   */
  useEffect(() => {
    setObserver(
      createObserverWithCallback((width) => {
        setIsElementNarrow(width < maxNarrowWidth);
      })
    );
  }, [maxNarrowWidth]);

  /**
   * Restart observing element if element or observer changes.
   */
  useEffect(() => {
    if (elementRef && elementRef.current && observer) {
      observer.observe(elementRef.current);
      return () => observer.disconnect();
    }
  }, [elementRef, observer]);

  return isElementNarrow;
};

const createObserverWithCallback = (callback: (width: number) => void) =>
  new ResizeObserver((entries) => {
      callback(entries[0].contentRect.width);
    }
  );