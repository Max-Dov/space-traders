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
  }, [tooltipElement, bodyWidth, ...deps]);
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
  }, [tooltipElement, scrollTop, ...deps]);
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