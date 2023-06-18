import { RefObject, useEffect, useState } from 'react';

/**
 * Makes sure tooltip stays within browser window viewport and horizontally aligned at center of children.
 */
export const useTooltipHorizontalPosition = (
  tooltipRef: RefObject<HTMLDivElement>,
  childrenRef: RefObject<HTMLSpanElement>,
  deps: any[],
) => {
  const bodyWidth = document.body.getBoundingClientRect().width;
  useEffect(() => {
      const tooltipElement = tooltipRef.current;
      const childrenElement = childrenRef.current;
      if (tooltipElement && childrenElement) {
        const { left, right, width: tooltipWidth } = tooltipElement.getBoundingClientRect();
        const { width: childrenWidth } = childrenElement.getBoundingClientRect();
        const rightOverflow = right - bodyWidth;

        const centeredPosition = Math.trunc((childrenWidth - tooltipWidth) / 2);

        if ((left + centeredPosition) < 0) {
          tooltipElement.style.left = `calc(${-left}px + 0.5em)`;
        } else if ((rightOverflow + centeredPosition) > 0) {
          tooltipElement.style.left = `calc(-${rightOverflow}px - 0.5em)`;
        } else { // then need to just center tooltip
          tooltipElement.style.left = `${Math.trunc(centeredPosition)}px`;
        }
      }
  }, [bodyWidth, ...deps]);
};

export const useTimeout = (ms: number, deps: any[]): boolean => {
  const [hasPassed, setHasPassed] = useState(false);

  useEffect(() => {
    setHasPassed(false);
    const timeoutId = setTimeout(() => setHasPassed(true), ms);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [ms, ...deps]);

  return hasPassed;
};