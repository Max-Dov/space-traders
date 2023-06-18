import React, { HTMLAttributes, ReactNode, useRef, useState } from 'react';
import classNames from 'classnames';
import './tooltip.styles.scss';
import { Icon } from '@shared/icon/icon.component';
import { useTimeout, useTooltipHorizontalPosition } from './tooltip.utils';

type TooltipDelay = 'short' | 'long'

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
  doNothingOnClick?: string;
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
  const childrenRef = useRef<HTMLSpanElement>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  let timeout = 0;
  if (tooltipDelay === 'short') {
    timeout = 400;
  } else if (tooltipDelay === 'long') {
    timeout = 1000;
  }
  const timeoutPassed = useTimeout(timeout, [isHovered]);
  const shouldDisplay = (isActive && !doNothingOnClick) || isHovered && (!tooltipDelay || timeoutPassed);

  useTooltipHorizontalPosition(tooltipRef, childrenRef, [shouldDisplay]);

  return <div className={classNames('tooltip-container', {
    'omit-text-underline': omitTextUnderline,
  })}>
    <span
      ref={childrenRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!isIconTooltip
        ? <span
          className="text-to-highlight"
          onClick={() => setIsActive(!isActive)}
        >
          {children}
        </span>
        : <button
          onClick={() => setIsActive(!isActive)}
          className={classNames('tooltip-button', { 'is-active': isActive })}
        >
          {customIcon || <Icon name="CircledQuestion" />}
        </button>
      }
    </span>
    {shouldDisplay && (
      isFancyTooltip
        ? (
          <div ref={tooltipRef} className="tooltip fancy-tooltip">
            <div className="tooltip-header">
              <div>
                <Icon name="Advice" />
                {' '}
                Tooltip
              </div>
              {isActive && <button className="inline-button" onClick={() => setIsActive(false)}>
                  <Icon name="Close" />
              </button>}
            </div>
            <div className="image-with-text">
              <div className="tooltip-text">
                {tooltipText}
              </div>
              {tooltipImgName && <img src={`/${tooltipImgName}.webp`} alt="tooltip-image" />}
            </div>
          </div>
        ) : <div className="tooltip tooltip-text simple-tooltip" ref={tooltipRef}>
          {tooltipText}
          {isActive && <button className="inline-button" onClick={() => setIsActive(false)}>
              <Icon name="Close" />
          </button>}
        </div>
    )}
  </div>;
};