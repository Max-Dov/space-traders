import { RefObject, useEffect, useState } from 'react';

/**
 * Makes sure tooltip stays within browser window viewport and horizontally aligned at center of children.
 */
export const useTooltipHorizontalPosition = (
  tooltipRef: RefObject<HTMLDivElement>,
  childrenRef: RefObject<HTMLSpanElement>,
  deps: any[]
) => {
  const bodyWidth = document.body.getBoundingClientRect().width;

  const tooltipElement = tooltipRef.current;
  const childrenElement = childrenRef.current;

  useEffect(() => {
    if (tooltipElement && childrenElement) {
      const { width: tooltipWidth } = tooltipElement.getBoundingClientRect();
      const { width: childrenWidth, left, right } = childrenElement.getBoundingClientRect();
      
      const rightLength = bodyWidth - right;
      const tooltipCenter = Math.ceil(tooltipWidth / 2);

      if (rightLength > tooltipCenter && left > tooltipCenter) {
        tooltipElement.style.left = `calc(${left + childrenWidth / 2 - tooltipCenter}px)`;
      } else if (tooltipCenter > rightLength) {
        tooltipElement.style.right = `0.5em`;
      } else if (tooltipCenter > left) {
        tooltipElement.style.left = `0.5em`;
      }
    }
  }, [tooltipElement, ...deps]);
};

export const useTooltipVerticalPosition = (
  tooltipRef: RefObject<HTMLDivElement>,
  childrenRef: RefObject<HTMLSpanElement>,
  deps: any[]
) => {
  const tooltipElement = tooltipRef.current;
  const childrenElement = childrenRef.current;

  const scrollTop = window.scrollY;

  useEffect(() => {
    if (tooltipElement && childrenElement) {
      const { height: tooltipHeight } = tooltipElement.getBoundingClientRect();
      const { top, bottom, height: childrenHeight } = childrenElement.getBoundingClientRect();

      if (tooltipHeight + childrenHeight > top) {
        tooltipElement.style.top = `calc(${bottom + scrollTop + tooltipHeight}px + 1em)`;
      } else {
        tooltipElement.style.top = `calc(${top + scrollTop}px - 0.5em)`;
      }
    }
  }, [tooltipElement, ...deps]);
};

/**
 * Returns `true` after set timeout in ms.
 * Re-renders twice so useRef hooks can catch up after timeout ended.
 */
export const useTimeout = (ms: number, deps: any[]): boolean => {
  const [hasPassed, setHasPassed] = useState(false);

  useFixUseRefsCatchUp(hasPassed);

  useEffect(() => {
    setHasPassed(false);
    const timeoutId = setTimeout(() => setHasPassed(true), ms);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [ms, ...deps]);

  return hasPassed;
};

/**
 * If using useRefs in code, then after timeout they would not catch up (component dependent on timeout would be
 * rendered, but useRefs are still null). That brings inconvenience.
 *
 * Note: if you want to repro problem for investigation purposes, comment out that hook usage in useTimeout
 * and try hovering over delayed tooltip. E.g. market last time updated time tooltip.
 */
const useFixUseRefsCatchUp = (delayPassed: boolean) => {
  const [_delayPassed, setDelayPassed] = useState(false);
  useEffect(() => {
    setDelayPassed(delayPassed)
  }, [delayPassed])
}