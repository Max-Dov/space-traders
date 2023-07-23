import React, { HTMLAttributes, ReactNode, RefObject, useRef, useState } from 'react';
import classNames from 'classnames';
import './tooltip.styles.scss';
import { Icon } from '@shared/icon/icon.component';
import { useTimeout, useTooltipHorizontalPosition, useTooltipVerticalPosition } from './tooltip.utils';
import { TooltipPortal } from './tooltip-portal.component';

type TooltipDelay = 'short' | 'long';

interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  tooltipText: ReactNode;
  /**
   * If true, would show fancy icon.
   */
  isFancyTooltip?: boolean;
  /**
   * Image for tooltip passed as image name.
   */
  tooltipImgName?: string;
  /**
   * If true, would not render children and would just render icon.
   */
  isIconTooltip?: boolean;
  /**
   * If isIconTooltip, then instead help icon would render provided icon.
   */
  customIcon?: ReactNode;
  /**
   * If true, text underline would not be added. Note: icons don't have it by default.
   * Does nothing on false.
   */
  omitTextUnderline?: boolean;
  /**
   * Timeout before tooltip would be shown.
   * For some actively used elements it is annoying to see immediate tooltip.
   */
  tooltipDelay?: TooltipDelay;
  /**
   * If true, tooltip would not be toggleable when clicked.
   * Useful for button-wrapping tooltips.
   */
  doNothingOnClick?: boolean;
}

/**
 * Tooltip that can be either standalone clickable icon or text wrapper.
 */
export const Tooltip = ({
  tooltipText,
  children,
  isIconTooltip,
  customIcon,
  omitTextUnderline,
  tooltipDelay,
  doNothingOnClick,
  isFancyTooltip,
  tooltipImgName,
}: TooltipProps) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  let timeout = 0;
  if (tooltipDelay === 'short') {
    timeout = 400;
  } else if (tooltipDelay === 'long') {
    timeout = 1000;
  }
  const delayPassed = useTimeout(timeout, [isHovered]);
  /**
   * Should display when:
   * 1. isActive (clicked) and clicking is not disabled (doNothingOnClick).
   * 2. isHovered and if there's tooltipDelay, delay should be already passed.
   */
  const shouldDisplay = (isActive && !doNothingOnClick) || (isHovered && (!tooltipDelay || delayPassed));

  useTooltipHorizontalPosition(tooltipRef, childrenRef, [shouldDisplay]);
  useTooltipVerticalPosition(tooltipRef, childrenRef, [shouldDisplay]);

  return (
    <div
      className={classNames('tooltip-container', {
        'omit-text-underline': omitTextUnderline,
      })}
    >
      {!isIconTooltip ? (
        <span
          ref={childrenRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="text-to-highlight"
          onClick={() => setIsActive(!isActive)}
        >
          {children}
        </span>
      ) : (
        <button
          ref={childrenRef as RefObject<HTMLButtonElement>}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setIsActive(!isActive)}
          className={classNames('tooltip-button', { 'is-active': isActive })}
        >
          {customIcon || <Icon name="CircledQuestion"/>}
        </button>
      )}
      <TooltipPortal>
        {shouldDisplay && (
          isFancyTooltip ? (
            <div ref={tooltipRef} className="portaled-tooltip fancy-tooltip">
              <div className="tooltip-header">
                <div>
                  <Icon name="Advice"/> Tooltip
                </div>
                {isActive && (
                  <button className="inline-button" onClick={() => setIsActive(false)}>
                    <Icon name="Close"/>
                  </button>
                )}
              </div>
              <div className="image-with-text">
                <div className="tooltip-text">{tooltipText}</div>
                {tooltipImgName && <img src={`/${tooltipImgName}.webp`} alt="tooltip-image"/>}
              </div>
            </div>
          ) : (
            <div className="portaled-tooltip tooltip-text simple-tooltip" ref={tooltipRef}>
              {tooltipText}
              {isActive && !doNothingOnClick && (
                <button className="inline-button" onClick={() => setIsActive(false)}>
                  <Icon name="Close"/>
                </button>
              )}
            </div>
          )
        )}
      </TooltipPortal>
    </div>
  );
};