import React, { HTMLAttributes, ReactNode, RefObject, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import './tooltip.styles.scss';
import { Icon } from '@shared/icon/icon.component';

interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  tooltipText: ReactNode;
  children?: ReactNode;
  /**
   * If true, would not render children and would just render "help" icon.
   */
  isIconTooltip?: boolean;
  /**
   * If isIconTooltip, then instead help icon would render provided icon.
   */
  customIcon?: ReactNode;
}

/**
 * Tooltip that can be either standalone clickable icon or text wrapper.
 */
export const Tooltip = ({ tooltipText, children, isIconTooltip, customIcon }: TooltipProps) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const isDisplayed = isHovered || isActive;

  useTooltipPosition(isDisplayed, tooltipRef);

  return <div className={classNames('tooltip-container', {
    'is-icon-tooltip': isIconTooltip,
  })}>
    {!isIconTooltip && (
      <span
        className="text-to-highlight"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsActive(!isActive)}
      >
        {children}
      </span>
    )}
    {isIconTooltip && (
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsActive(!isActive)}
        className={classNames('tooltip-button', { 'is-active': isActive })}
      >
        {customIcon || <Icon name="CircledQuestion" />}
      </button>
    )}
    {isDisplayed && <div className="tooltip-text" ref={tooltipRef}>
      {tooltipText}
    </div>}
  </div>;
};

/**
 * Makes sure tooltip stays within browser window viewport.
 */
const useTooltipPosition = (isTooltipDisplayed: boolean, tooltipRef: RefObject<HTMLDivElement>) => {
  useEffect(() => {
    if (isTooltipDisplayed) {
      const tooltipElement = tooltipRef.current;
      if (tooltipElement) {
        const { left, right } = tooltipElement.getBoundingClientRect();
        if (left < 0) {
          tooltipElement.style.left = `calc(${-left}px + 1em)`;
        } else if (right < 0) {
          // TODO didn't check and not sure I did math there right
          tooltipElement.style.right = `calc(${-right}px + 1em)`;
        }
      }
    }
  }, [isTooltipDisplayed]);
};